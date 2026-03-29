import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoginType, SignupType, UserInfoType, UsrAuthType} from '../../../types/usr_services/usr.auth.type';
import {DefResponceType} from '../../../types/def.responce.type';
import {environment} from '../../../environments/environment';
import {StorageAuthinfoService} from '../common-srv/storage-authinfo-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly _snackBar = inject(MatSnackBar);


  private user = signal<UsrAuthType | null>(null);
  public userInfo = signal<UserInfoType | null>(null);
  public isLogin = signal<boolean>(false);
  public message = signal<string | null>(null);
  public loginError =signal<boolean>(false);

  public loading = signal<boolean>(false);
  public error = signal<string | null>(null);

  private readonly saveAuthService = inject(StorageAuthinfoService);



 public logout(): void {
    const tokens = this.saveAuthService.getTokens();
    if (tokens && tokens.refreshToken) {
      this.http.post<DefResponceType>(
        environment.apiUrl + 'logout', {
          refreshToken: tokens.refreshToken,
        }).subscribe({
        next: (res: DefResponceType) => {
          if (res && res.message && res.message.length > 0) {
            this._snackBar.open('Успешно разлогинен');
            this.message.set(res.message);
          }
        }
      });
    }
  }

  signup(prm: SignupType) {
    this.user.set(null);
    this.userInfo.set(null);
    this.error.set(null);
    this.loading.set(true);

    this.http.post<DefResponceType | UsrAuthType>(
      environment.apiUrl + 'signup', {
        name: prm.name,
        email: prm.email,
        password: prm.password,
      }).subscribe({
      next: (signUsr) => {
        let error = null;
        if ((signUsr as DefResponceType).error !== undefined) {
          error = (signUsr as DefResponceType).message;
        }
        const signResponce = signUsr as UsrAuthType;
        if (!signResponce.accessToken || !signResponce.refreshToken || !signResponce.userId) {
          error = 'Ошибка параметра авторизации';
        }
        if (error) {
          this.error.set(error);
          this.user.set(null);
          this.loading.set(false);
        } else {
          this.user.set(signUsr as UsrAuthType);
          this.saveAuthService.setTokens((signUsr as UsrAuthType).accessToken, (signUsr as UsrAuthType).refreshToken);
          this.saveAuthService.saveUserInfo({id: (signUsr as UsrAuthType).userId, name: prm.name, email: prm.email});
          this.userInfo.set({id: (signUsr as UsrAuthType).userId, name: prm.name, email: prm.email});
          this.loading.set(false);
          this.isLogin.set(true);
        }
      },
      error: (errorResponce) => {
        console.log(errorResponce.message);
        if (errorResponce.message && errorResponce.error) {

          this.error.set(errorResponce.message);
          this.user.set(null);
          this.loading.set(false);
        } else {
          this.error.set('Ошибка авторизации');
          this.user.set(null);
          this.loading.set(false);
        }
      }
    })
  }


  login(prm: LoginType) {
    this.user.set(null);
    this.userInfo.set(null);
    this.error.set(null);
    this.loading.set(true);
    this.loginError.set(false);

    this.http.post<DefResponceType | UsrAuthType>(
      environment.apiUrl + 'login', {
        email: prm.email,
        password: prm.password,
        rememberMe: prm.rememberMe
      }).subscribe({
      next: (logUsr) => {
        let error = null;
        if ((logUsr as DefResponceType).error !== undefined) {
          error = (logUsr as DefResponceType).message;
        }
        const loginResponse = logUsr as UsrAuthType;
        if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
          error = 'Ошибка параметра логина';
          this.loginError.set(true);
        }
        if (error) {
          this.error.set(error);
          this.user.set(null);
          this.loading.set(false);
          this.loginError.set(true);
        } else {
          this.user.set(logUsr as UsrAuthType);
          this.saveAuthService.setTokens((logUsr as UsrAuthType).accessToken, (logUsr as UsrAuthType).refreshToken);
          const headers = new HttpHeaders({
            'x-auth': (logUsr as UsrAuthType).accessToken
          })
          this.http.get<UserInfoType | DefResponceType>(
            environment.apiUrl + 'users', {
              headers: headers,
            }).subscribe({
              next: (usrInfo) => {
                if ((usrInfo as DefResponceType).error !== undefined) {
                  const err_msg = (usrInfo as DefResponceType).message as string;
                  this.error.set(err_msg);
                  this.user.set(null);
                  this.userInfo.set(null);
                  this.loading.set(false);
                  this.loginError.set(true);
                } else {
                  this.userInfo.set(usrInfo as UserInfoType);
                  this.isLogin.set(true);
                  this.saveAuthService.saveUserInfo(usrInfo as UserInfoType);
                  this.loading.set(false);
                  this.loginError.set(false);

                }
              },
              error: (err) => {
                this.error.set('Ошибка получения информации о пользователе');
                this.user.set(null);
                this.userInfo.set(null);
                this.loading.set(false);
                this.loginError.set(true);

              }
            }
          )
        }
      },
      error: (errorResponce) => {
        if (errorResponce.message && errorResponce.error) {
          this.error.set(errorResponce.message);
          this.user.set(null);
          this.loading.set(false);
          this.loginError.set(true);
        } else {
          this.error.set('Ошибка логина');
          this.user.set(null);
          this.loading.set(false);
          this.loginError.set(true);

        }
      }
    })
  }

}
