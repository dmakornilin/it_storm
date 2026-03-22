import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderSrv {

  isShowed$ = new Subject<boolean>();

  show():void {
    this.isShowed$.next(true);
  }

  hide():void {
    this.isShowed$.next(false);
  }



}
