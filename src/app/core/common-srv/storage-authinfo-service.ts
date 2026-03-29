import { Injectable } from '@angular/core';
import {LocalStorageService,} from './local-storage-service';
import {UserInfoType} from '../../../types/usr_services/usr.auth.type';
import {ACCESS_TOKEN_KEY,REFRESH_TOKEN_KEY,USER_ID_KEY,USER_INFO_KEY} from './storage-const';

@Injectable({
  providedIn: 'root',
})
export class StorageAuthinfoService {
  public setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }

  public removeTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  public getTokens(): { accessToken: string | null, refreshToken: string | null } {
    return (
      {
        accessToken: LocalStorageService.getStr(ACCESS_TOKEN_KEY),
        refreshToken: LocalStorageService.getStr(REFRESH_TOKEN_KEY)
      });
  }

  public removeUserInfo() {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USER_INFO_KEY);
  }

  public saveUserInfo(usrInfo:UserInfoType) {
    localStorage.setItem(USER_INFO_KEY,JSON.stringify(usrInfo) );
  }


}
