import {Component, computed, effect, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {LoginService} from '../../../shared/services/login-service';
import {AuthService} from '../../../core/auth/auth-service';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgStyle,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  protected loginForm: FormGroup;
  fb = inject(FormBuilder);

  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly navigateService = inject(NavigateService);

  loginError = computed(()=>this.authService.loginError() );

  protected readonly checkLoading =computed(()=> this.authService.isLogin() );



  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: ['false'],
    });
    effect(() => {
      const currentValue = this.authService.isLogin();
      this.check_login(currentValue);
    });
  }


  private check_login(yy:boolean) {
    if (yy) { this.navigateService.to_main(); }
  }

  login() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password, this.loginForm.value.rememberMe);
  }

}
