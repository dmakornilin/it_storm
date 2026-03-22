import {Component, inject, Input} from '@angular/core';
import {ArticleCommentItem} from '../../../../types/articles/article-detail.type';
import {AuthService} from '../../../core/auth/auth-service';
import {CommentActionsService} from '../../../shared/services/comments/comment-actions-service';
import {UserCommentActions} from '../../../shared/params';
import {BlogArticleItemService} from '../../../shared/services/blog/blog-article-item-service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-action-card',
  imports: [],
  templateUrl: './comment-action-card.html',
  styleUrl: './comment-action-card.scss',
})
export class CommentActionCard {
  @Input() itm: ArticleCommentItem | null = null;
  authService = inject(AuthService);
  private readonly actionService = inject(CommentActionsService);
  isLogin = this.authService.isLogin();

  private readonly action_success: string = 'Ваш голос учтен';
  private readonly violate_success: string = 'Жалоба отправлена';
  private readonly action_error: string = 'Ошибка учета отклика';
  private readonly violate_error: string = 'Ошибка отправки жалобы';

  _snackBar = inject(MatSnackBar);


  setActionNom(nomAct:number,prm :number,tek_nom:number) {
      let nn=nomAct;
      if (prm>=0) {nn=prm}
    if (this.itm) {

      if (nn===0) {
        if (tek_nom === 1) { this.itm.likesCount-- }
        if (tek_nom === 2) { this.itm.dislikesCount-- }
        this.itm.nomer = nn;
      }
      if (nn===1) {
        this.itm.likesCount++;
        this.itm.nomer = nn;
      }
      if (nn===2) {
        this.itm.dislikesCount++;
        this.itm.nomer = nn;
      }

    }
  }

  apply_action(nn: number) {


    if (this.itm && this.isLogin) {
      let tek_nom=0; let to_act=-10;
      let yy= (nn===1 || nn===2 || nn===3);
          let s1=''; let s2='';
      if  (this.itm?.nomer) {tek_nom=this.itm.nomer; }

      if (yy && tek_nom>=1 && nn===3) {
        this._snackBar.open('Чтобы подать жалобу, снимите предыдущий голос');
        yy=false;
      }
      if (yy && tek_nom>=1 && !(tek_nom===nn)) {
        this._snackBar.open('Снимите предыдущий голос');
        yy=false;
      }
      if (yy && tek_nom>=1 && (tek_nom===nn)) {
        s1='Предыдущий голос снят';
        s2='';
        to_act=0;
      }
      if (yy && tek_nom===0) {
        if (nn===3) {
          s1=this.violate_success; s2=this.violate_error;
        } else {
          s1=this.action_success; s2=this.action_error;
        }
      }

      if (yy) {
        let act: UserCommentActions | null = null;
        if (nn === 1) {
          act = UserCommentActions.like
        }
        if (nn === 2) {
          act = UserCommentActions.dislike
        }
        if (nn === 3) {
          act = UserCommentActions.violate
        }
        if (act) {
          if (nn === 3) {
            this.actionService.apply_action(this.itm, act, s1, s2);
          } else {
            this.actionService.apply_action(this.itm, act, s1, s2).subscribe({
              next: (nomAct) => {
                this.setActionNom(nomAct,to_act,tek_nom);
              }
            });
          }
        }
      }

    }
  }


}
