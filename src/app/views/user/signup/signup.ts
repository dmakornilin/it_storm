import {Component, effect, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MainRegular} from '../../../shared/service-params';
import {NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {LoginService} from '../../../shared/services/login-service';
import {AuthService} from '../../../core/auth/auth-service';
import {NavigateService} from '../../../shared/services/navigate-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    NgStyle,
    RouterLink
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup{

  protected signupForm: FormGroup;
  fb = inject(FormBuilder);

  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly navigateService = inject(NavigateService);
  private readonly _snackBar = inject(MatSnackBar);


  constructor() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(MainRegular.nameRg)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(MainRegular.pswRg)]],
      agree: [false, [Validators.requiredTrue]],
    });
    effect(() => {
      const currentValue = this.authService.isLogin();
      this.check_login(currentValue);
    });
    effect(() => {
      const currentLoading = this.authService.loading();
      if (!currentLoading) {
        this.check_loading();
      }
    })
  }

  private check_login(yy: boolean) {
    if (yy) {
      this.navigateService.to_main();
    }
  }

  private check_loading() {
    const is_login = this.authService.isLogin();
    if (!is_login) {
        this._snackBar.open('Ошибка регистрации');
    }
  }

  signup() {
    if (this.signupForm.valid && this.signupForm.value.name && this.signupForm.value.email &&
      this.signupForm.value.password && this.signupForm.value.agree) {
      this.loginService.signup(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password);
    }
  }

  to_agreement() {
    this.navigateService.to_agreement();
  }

  to_persdata() {
    this.navigateService.to_persdata();
  }
}
