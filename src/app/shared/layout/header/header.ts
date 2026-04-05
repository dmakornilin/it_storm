import {Component, computed, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MainMenu} from '../../components/main-menu/main-menu';
import {AuthService} from '../../../core/auth/auth-service';
import {LoginService} from '../../services/login-service';
import {NavigateService} from '../../services/navigate-service';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {ModalNavigateService} from '../../services/modal-navigate-service';
import {BaseParams} from '../../../core/settings/params';


@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    MainMenu,
    MatMenu,
    MatMenuTrigger
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})


export class Header  {
  private readonly authService = inject(AuthService);
  private readonly loginService = inject(LoginService);
  private readonly navigateSrv = inject(NavigateService);
  private readonly modalSrv = inject(ModalNavigateService);

  protected readonly phone = BaseParams.phone;


  protected readonly isLogin = computed(()=> {
    return this.authService.isLogin();
  } )

  protected readonly userInfo = computed(()=> {
    return this.authService.userInfo();
  } )


  router = inject(Router);

  to_consult(): void {
    this.modalSrv.toPhoneConsult();
  }


  to_auth() {
    if (this.isLogin()) {
      this.loginService.logout();
    } else {
      this.navigateSrv.to_login();
    }
  }
}
