import {inject, Injectable} from '@angular/core';
import {CategoriesListType} from '../../../../types/articles/categories.type';
import {HttpClient} from '@angular/common/http';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly http = inject(HttpClient);
   loadingCtg():Observable<CategoriesListType | DefResponceType> {
     return this.http.get<CategoriesListType | DefResponceType>(
       environment.apiUrl + 'categories');
   }



}
