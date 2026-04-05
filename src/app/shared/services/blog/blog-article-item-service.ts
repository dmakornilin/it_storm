import { inject, Injectable, signal} from '@angular/core';
import {
  ArticleCommentItem,
  ArticleDetailType,
  TopArticleComments
} from '../../../../types/articles/article-detail.type';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {PopularArticleType} from '../../../../types/articles/popular-article.type';
import {CommentActionsService} from '../comments/comment-actions-service';
import {concatMap, from, map} from 'rxjs';
import {AuthService} from '../../../core/auth/auth-service';

@Injectable({
  providedIn: 'root',
})
export class BlogArticleItemService {
  private readonly authService = inject(AuthService);
  private readonly actionSrv = inject(CommentActionsService);
  protected readonly _snackBar = inject(MatSnackBar);
  private readonly http = inject(HttpClient);


  articleDetailInfo = signal<ArticleDetailType | null>(null);
  relatedArticles = signal<PopularArticleType>([]);
  totalCommentsCount = signal<number>(0);
  isCommentLoad = signal<boolean>(false);
  articleId = signal<string>('');
  articleUrl = signal<string>('');
  comments = signal<ArticleCommentItem[]>([]);



  load_article_comments() {
    const yy = this.authService.isLogin();
    const tp = this.comments().length;
    const artId = this.articleId();
    this.isCommentLoad.set(true);

    this.http.get<TopArticleComments | DefResponceType>(
      environment.apiUrl + 'comments?offset=' + tp + '&article=' + artId).subscribe({

      next: data => {
        let error: string | null = null;
        if ((data as DefResponceType).error !== undefined) {
          error = (data as DefResponceType).message as string;
        }
        if (error) {
          this._snackBar.open(error);
          this.isCommentLoad.set(false);
        } else {
          const lst = (data as TopArticleComments).comments;
            let comments = this.comments();
            lst.forEach((comment) => {
              comments.push(comment);
            });
          if (yy) {
            this.test_await(comments);
          } else {
            this.comments.set(comments);
          }
          this.isCommentLoad.set(false);
        }
      },
      error: error => {
        this._snackBar.open('Ошибка загрузки коммент');
        this.isCommentLoad.set(false);
      }
    })
  }


  test_await(lst: ArticleCommentItem[]): void {
    from(lst).pipe(
      concatMap(comment =>
        this.actionSrv.getNomByActions(comment.id).pipe(
          map(nomer => ({...comment, nomer}))
        )
      )
    ).subscribe({
      next: (updatedComment: ArticleCommentItem) => {
        // Находим исходный элемент и обновляем его
        const index = lst.findIndex(c => c.id === updatedComment.id);
        if (index !== -1) {
          lst[index] = updatedComment;
        }
      },
      complete: () => {
        this.comments.set(lst);
      }
    });
  }


  load_article_info(url: string) {
    const yy = this.authService.isLogin();
    this.isCommentLoad.set(true);
    this.http.get<ArticleDetailType | DefResponceType>(
      environment.apiUrl + 'articles/' + url).subscribe({
      next: data => {
        let error: string | null = null;
        if ((data as DefResponceType).error !== undefined) {
          error = (data as DefResponceType).message as string;
        }
        if (error) {
          this._snackBar.open(error);
          this.isCommentLoad.set(false);
        } else {
          const artId = (data as ArticleDetailType).id;
          this.articleId.set(artId);
          this.articleUrl.set(url);
          const lst = (data as ArticleDetailType).comments;
          let comments: ArticleCommentItem[] = [];
          comments.splice(0, this.comments.length);
          lst.forEach(comment => {
            let com_nom = comment;
            comments.push(com_nom);
          });
            if (yy) {
              this.test_await(comments);
            } else {
              this.comments.set(comments);
            }

          this.articleDetailInfo.set(data as ArticleDetailType);
          const nn = (data as ArticleDetailType).commentsCount;
          if (nn) this.totalCommentsCount.set(nn);
          this.isCommentLoad.set(false);

        }
      },
      error: error => {
        this._snackBar.open('Ошибка загрузки статьи');
        this.isCommentLoad.set(false);
      }
    })
  }


  load_related_articles(url: string) {
    this.http.get<PopularArticleType | DefResponceType>(
      environment.apiUrl + 'articles/related/' + url).subscribe({
      next: data => {
        let error: string | null = null;
        if ((data as DefResponceType).error !== undefined) {
          error = (data as DefResponceType).message as string;
        }
        if (error) {
          this._snackBar.open(error);
        } else {
          this.relatedArticles.set(data as PopularArticleType);
        }
      },
      error: error => {
        this._snackBar.open('Ошибка загрузки статей');
      }
    })
  }


}
