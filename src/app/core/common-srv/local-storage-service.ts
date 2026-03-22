import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  public static getStr(key:string):string | null {
    if (typeof localStorage !== 'undefined') {
      const value = localStorage.getItem(key);
      return value ? value : null;
    } else return null;  }

}
