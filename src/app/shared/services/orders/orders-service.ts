import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefResponceType} from '../../../../types/def.responce.type';
import { ParamToOrderType} from '../../../../types/orders/param-toorder.type';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  private readonly http = inject(HttpClient);

  setOrderRequest(prm: ParamToOrderType): Observable<DefResponceType> {
    return this.http.post<DefResponceType>(environment.apiUrl + 'requests', prm);
  }

}
