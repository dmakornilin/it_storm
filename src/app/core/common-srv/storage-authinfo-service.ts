import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage-service';
import {UserInfoType} from '../../../types/usr_services/usr.auth.type';

@Injectable({
  providedIn: 'root',
})
export class StorageAuthinfoService {
  public readonly accessTokenKey: string = 'accessToken-Storm';
  public readonly refreshTokenKey: string = 'refreshToken-Storm';
  public readonly userIdKey: string = 'userId-Storm';
  public readonly userInfoKey: string = 'userInfo-Storm';

  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  public removeTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  public getTokens(): { accessToken: string | null, refreshToken: string | null } {
    return (
      {
        accessToken: LocalStorageService.getStr(this.accessTokenKey),
        refreshToken: LocalStorageService.getStr(this.refreshTokenKey)
      });
  }

  public removeUserInfo() {
    localStorage.removeItem(this.userIdKey);
    localStorage.removeItem(this.userInfoKey);
  }

  public saveUserInfo(usrInfo:UserInfoType) {
    localStorage.setItem(this.userInfoKey,JSON.stringify(usrInfo) );
  }


}
