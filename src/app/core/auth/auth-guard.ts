import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService} from '../../shared/services/login-service';

export const authGuard:  CanActivateFn = () => {
  const  authSrv= inject(LoginService);
  const _snackBar = inject(MatSnackBar);

  const isLogged:boolean =authSrv.isLogin();
  if (!isLogged) {
    _snackBar.open('Для доступа необходимо авторизоваться');
  }
  return isLogged;

};
