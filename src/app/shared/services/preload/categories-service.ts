import {inject, Injectable, signal} from '@angular/core';
import {CategoriesListType} from '../../../../types/articles/categories.type';
import {HttpClient} from '@angular/common/http';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories = signal<CategoriesListType>([]);
  _snackBar = inject(MatSnackBar);
  private readonly http = inject(HttpClient);
  flagCtg= signal<boolean>(false);

   loading() {
    this.http.get<CategoriesListType | DefResponceType>(
      environment.apiUrl + 'categories').subscribe({
      next: data => {
        let error:string | null = null;
          if ((data as DefResponceType).error !== undefined) {
            error = (data as DefResponceType).message as string;
          }
          if (error) {
            this._snackBar.open(error);
          } else {
            this.categories.set(data as CategoriesListType);
            this.flagCtg.set(true);
          }
      },
      error: error => {
        this._snackBar.open('Ошибка загрузки категорий');
      }
    })
  }




}
