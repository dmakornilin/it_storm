import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from '../../core/common-srv/local-storage-service';
import {LoginType, SignupType, UserInfoType} from '../../../types/usr_services/usr.auth.type';
import {Observable} from 'rxjs';
import {RefreshResponseType} from '../../../types/usr_services/refresh-response.type';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/auth/auth-service';
import {StorageAuthinfoService} from '../../core/common-srv/storage-authinfo-service';
import {REFRESH_TOKEN_KEY,USER_INFO_KEY} from '../../core/common-srv/storage-const';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  isLogin =this.authService.isLogin;

  private readonly saveAuthService= inject(StorageAuthinfoService);


  public refresh(): Observable<RefreshResponseType> {
    const refreshToken = LocalStorageService.getStr(REFRESH_TOKEN_KEY);
    return this.http.post<RefreshResponseType>(environment.apiUrl + 'refresh', {
      refreshToken: refreshToken
    });
  }


  private removeUserLogin() {
    this.saveAuthService.removeUserInfo();
    this.saveAuthService.removeTokens();
    this.authService.userInfo.set(null);
    this.authService.isLogin.set(false);
  }


  private check_storage_info(): void {
    const tokens = this.saveAuthService.getTokens();
    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      this.removeUserLogin();
    } else {
      const dataStorage = LocalStorageService.getStr(USER_INFO_KEY);
      if (!dataStorage) {
        this.removeUserLogin();
      } else {
        try {
          const parsed = JSON.parse(dataStorage);
          if (parsed && parsed.id && parsed.email && parsed.name) {
            this.authService.userInfo.set(parsed as UserInfoType);
            this.authService.isLogin.set(true);
          } else {
            this.removeUserLogin();
          }
        } catch (error) {
          this.removeUserLogin();
        }
      }
    }
  }

  public logout():void {
    this.authService.logout();
    this.saveAuthService.removeTokens();
    this.saveAuthService.removeUserInfo();
    this.authService.userInfo.set(null);
    this.authService.isLogin.set(false);
  }

  public login(email: string, password: string, rememberMe: boolean): void {
    const prm: LoginType = {email: email, password: password, rememberMe: rememberMe};
    this.authService.login(prm);
  }

  public signup(name:string, email: string, password: string): void {
    const prm :SignupType ={ name:name, email:email, password:password};
    this.authService.signup(prm);
  }

  constructor() {
    this.check_storage_info();
  }

}
