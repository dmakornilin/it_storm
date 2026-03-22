import {inject, Injectable, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {CommentItemType} from '../../../../types/comments/comment-item.type';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {NavigateService} from '../navigate-service';
import {BlogArticleItemService} from '../blog/blog-article-item-service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  _snackBar = inject(MatSnackBar);
  private readonly http = inject(HttpClient);
  private readonly navigateSrv = inject(NavigateService);
  private readonly blogArticleSrv = inject(BlogArticleItemService);
  saveCommentFlag = signal<boolean>(false);

  set_comment(comment: CommentItemType,url:string) {
    this.saveCommentFlag.set(false);
    this.http.post<DefResponceType>(
      environment.apiUrl + 'comments',comment).subscribe({
      next: (res: DefResponceType) => {
        if ((res as DefResponceType).error) {
          this._snackBar.open((res as DefResponceType).message as string);
        } else {
          this.saveCommentFlag.set(true);
          this._snackBar.open(res.message as string);
          this.navigateSrv.setArtRefresh.set(true);
          this.blogArticleSrv.articleUrl.set(url);
        }
      },
      error: error => {
        const msg = error.error.message;
        if (msg && msg.length>1  ) {
          this._snackBar.open(msg);
        } else this._snackBar.open('Ошибка записи коммментария');
      }
    })
  }



}
