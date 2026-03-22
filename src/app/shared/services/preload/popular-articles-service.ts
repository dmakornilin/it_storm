import {inject, Injectable, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {PopularArticleType} from '../../../../types/articles/popular-article.type';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {CategoriesListType} from '../../../../types/articles/categories.type';

@Injectable({
  providedIn: 'root',
})
export class PopularArticlesService {
  _snackBar = inject(MatSnackBar);
  private readonly http = inject(HttpClient);
  public popularArticles = signal<PopularArticleType>([]);

  loading() {
    this.http.get<PopularArticleType | DefResponceType>(
      environment.apiUrl + 'articles/top').subscribe({
      next: data => {
        let error: string | null = null;
        if ((data as DefResponceType).error !== undefined) {
          error = (data as DefResponceType).message as string;
        }
        if (error) {
          this._snackBar.open(error);
        } else {
          this.popularArticles.set(data as PopularArticleType);
        }
      },
      error: error => {
        this._snackBar.open('Ошибка загрузки популярных статей');
      }
    })
  }

  constructor() {
    this.loading();
  }

}
