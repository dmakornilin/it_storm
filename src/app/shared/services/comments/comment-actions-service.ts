import {inject, Injectable, signal} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {ArticleCommentItem} from '../../../../types/articles/article-detail.type';
import {UserCommentActions} from '../../params';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {CommentActionsList} from '../../../../types/comments/comment-actions.type';
import {map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentActionsService {
  _snackBar = inject(MatSnackBar);
  private readonly http = inject(HttpClient);

  setActionFlag = signal<boolean>(false);
  nomerItem = signal<number>(0);
  commentAction = signal<CommentActionsList>([]);
  commentId = signal<string>('');


  getNomByActions(commentId: string): Observable<number> {
    return this.http.get<CommentActionsList | DefResponceType>(
      environment.apiUrl + 'comments/' + commentId + '/actions'
    ).pipe(
      map(data => {
        if ((data as DefResponceType).error !== undefined) {
          return 0;
        }
        const lst = data as CommentActionsList;
        if (lst.length > 0) {
          const act = lst[0].action;
          if (act === UserCommentActions.like) return 1;
          if (act === UserCommentActions.dislike) return 2;
        }
        return 0; // по умолчанию — нет действий или неизвестное действие
      })
    );
  }

  get_actions(commentId: string) {
    this.http.get<CommentActionsList | DefResponceType>(
      environment.apiUrl + 'comments/' + commentId + '/actions').subscribe({
      next: data => {
        let error: string | null = null;
        if ((data as DefResponceType).error !== undefined) {
          error = (data as DefResponceType).message as string;
        }
        if (error) {
          this._snackBar.open(error);
        } else {
          const lst = data as CommentActionsList;
          if (lst.length > 0) {
            const act = lst[0].action;
            // console.log(act);
            let nn: number = 0;
            const comId = lst[0].comment;
            if (act === UserCommentActions.like) {
              nn = 1
            }
            if (act === UserCommentActions.dislike) {
              nn = 2
            }
            if (!(nn === 0)) {
              this.nomerItem.set(nn);
              this.commentId.set(comId)
            }
          }
          this.commentAction.set(lst);
        }

      },
      error: error => {
        this._snackBar.open('Ошибка загрузки состояния комментария');
      }
    })
  }


  apply_action(comment : ArticleCommentItem, act:UserCommentActions, msg_succ:string, msg_err: string):Observable<number> {
    let prm = {action: ''};    let nn=0;
    if (act === UserCommentActions.like) { prm.action = 'like';  nn=1;  }
    if (act === UserCommentActions.dislike) {   prm.action = 'dislike';  nn=2; }
    if (act === UserCommentActions.violate) {  prm.action = 'violate'; }

    if (prm.action.length > 1) {
      this.http.post<DefResponceType>(
        environment.apiUrl + 'comments/' + comment.id + '/apply-action', prm).subscribe({
        next: (res: DefResponceType) => {
          if ((res as DefResponceType).error) {
            this._snackBar.open((res as DefResponceType).message as string);
            return of(0);
          } else {
            this.setActionFlag.set(true);
            this._snackBar.open(msg_succ);
            return of(nn);
          }
        },
        error: error => {
          const msg = error.error.message;
          if (msg && msg.length > 1 && msg_err==='') {
            this._snackBar.open(msg);
            return of(20);
          } else {this._snackBar.open(msg_err); return of(30); }
        }
      })
    } else return of(0);
     return of(nn);
  }

}
