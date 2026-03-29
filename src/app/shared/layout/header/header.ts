import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MainMenu} from '../../components/main-menu/main-menu';
import {BaseParams} from '../../params';
import {AuthService} from '../../../core/auth/auth-service';
import {LoginService} from '../../services/login-service';
import {NavigateService} from '../../services/navigate-service';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';

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
export class Header {
  phone=BaseParams.phone;
  authService= inject(AuthService);
  loginService= inject(LoginService);
  private readonly navigateSrv = inject(NavigateService);

  isLogin =this.authService.isLogin;
  userInfo=this.authService.userInfo;

  router= inject(Router);

to_consult():void {
  this.navigateSrv.to_order_consult();
}


  constructor() {
  }


  to_auth() {
    if (this.isLogin()) {
       this.loginService.logout();
    } else {
      this.navigateSrv.to_login();
    }
  }
}
