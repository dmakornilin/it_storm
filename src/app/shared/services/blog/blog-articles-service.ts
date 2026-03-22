import {inject, Injectable, signal} from '@angular/core';
import {BlogPaginatorService} from './blog-paginator-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {BlogArticlesListType} from '../../../../types/articles/blog-articles-list.type';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogArticlesService {

  articles = signal<BlogArticlesListType>({count: 0, pages: 0, items: []});
  private readonly paginatorSrv = inject(BlogPaginatorService);

  _snackBar = inject(MatSnackBar);
  private readonly http = inject(HttpClient);

  loading() {
    const ss = this.paginatorSrv.getUrlParams();
    const current = this.paginatorSrv.currentPage();
    this.http.get<BlogArticlesListType | DefResponceType>(
      environment.apiUrl + 'articles' + ss).subscribe({
      next: data => {
        let error: string | null = null;
        if ((data as DefResponceType).error !== undefined) {
          error = (data as DefResponceType).message as string;
        }
        if (error) {
          this._snackBar.open(error);
        } else {
          this.articles.set(data as BlogArticlesListType);
          const pages=(data as BlogArticlesListType).pages;
          this.paginatorSrv.pageAmount.set(pages);
          if (current===0 ) {
            if (pages >0) { this.paginatorSrv.currentPage.set(1)}
          } else {
            if (current>pages) { this.paginatorSrv.currentPage.set(pages)}
          }
        }
      },
      error: error => {
        this._snackBar.open('Ошибка загрузки статей блога');
      }
    })
  }
}
