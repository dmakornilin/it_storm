import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleCommentItem} from '../../../../types/articles/article-detail.type';
import {UserCommentActions} from '../../../core/settings/params';
import {DefResponceType} from '../../../../types/def.responce.type';
import {environment} from '../../../../environments/environment';
import {CommentActionsList} from '../../../../types/comments/comment-actions.type';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentActionsService {
  private readonly http = inject(HttpClient);

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

  post_action(comment : ArticleCommentItem, act:UserCommentActions):Observable<DefResponceType> {
    let prm = {action: ''};
    if (act === UserCommentActions.like) { prm.action = 'like';    }
    if (act === UserCommentActions.dislike) {   prm.action = 'dislike'; }
    if (act === UserCommentActions.violate) {  prm.action = 'violate'; }
    return  this.http.post<DefResponceType>(
      environment.apiUrl + 'comments/' + comment.id + '/apply-action', prm);
  }



}
