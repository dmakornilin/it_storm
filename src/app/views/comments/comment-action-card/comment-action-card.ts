import {Component, computed, inject, input} from '@angular/core';
import {ArticleCommentItem} from '../../../../types/articles/article-detail.type';
import {AuthService} from '../../../core/auth/auth-service';
import {CommentActionsService} from '../../../shared/services/comments/comment-actions-service';
import {UserCommentActions} from '../../../core/settings/params';
import {MatSnackBar} from '@angular/material/snack-bar';


const action_success: string = 'Ваш голос учтен';
const violate_success: string = 'Жалоба отправлена';
const action_error: string = 'Ошибка учета отклика';
const violate_repeate: string = 'Жалоба уже отправлена';



@Component({
  selector: 'app-comment-action-card',
  imports: [],
  templateUrl: './comment-action-card.html',
  styleUrl: './comment-action-card.scss',
})
export class CommentActionCard {
  public readonly itm = input.required<ArticleCommentItem>();

  private readonly authService = inject(AuthService);
  private readonly actionService = inject(CommentActionsService);

  protected readonly isLogin = computed(()=> {
    return this.authService.isLogin();
  } )


  _snackBar = inject(MatSnackBar);



  setActionNom(nomAct: number, prm: number, tek_nom: number) {
    let nn = nomAct;
    if (prm >= 0) {
      nn = prm
    }
    if (this.itm) {

      if (nn === 0) {
        if (tek_nom === 1) {
          this.itm().likesCount--
        }
        if (tek_nom === 2) {
          this.itm().dislikesCount--
        }
        this.itm().nomer = nn;
      }
      if (nn === 1) {
        this.itm().likesCount++;
        this.itm().nomer = nn;
      }
      if (nn === 2) {
        this.itm().dislikesCount++;
        this.itm().nomer = nn;
      }

    }
  }


  post_action(nn: number): void {
    if (this.itm && this.isLogin()) {
      let tek_itm = this.itm();
      let tek_nom = 0;
      let to_act = -10;
      let yy = (nn === 1 || nn === 2 || nn === 3);
      let s1 = '';
      let s2 = '';
      if (tek_itm.nomer) {
        tek_nom = tek_itm.nomer as number
      }


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
      if (yy && act) {
        if (nn === tek_nom) {
          yy = false;
          if (tek_nom === 3) {
            this._snackBar.open(violate_repeate)
          } else {
            this.actionService.post_action(tek_itm, act).subscribe({
              next: () => {
                this.setActionNom(nn, 0, tek_nom);
                this._snackBar.open('Ваш голос снят')
              }
            })
          }
        }
      }
      if (yy && act) {
        if (nn === 3) {
          s1 = violate_success;
          s2 = violate_repeate;
        } else {
          s1 = action_success;
          s2 = action_error
        }
        if ((tek_nom === 0) ||(nn===3) ) {
          yy =false;
          this.actionService.post_action(tek_itm, act).subscribe({
            next: value => {
              this._snackBar.open(s1);
              this.setActionNom(nn, to_act, tek_nom);
            },
            error: value => {
              this._snackBar.open(s2);
            }
          })
        } else
         {
          yy=false;
          this.actionService.post_action(tek_itm, act).subscribe({
            next: value => {
              this.setActionNom(nn, 0, tek_nom);
              this.actionService.post_action(tek_itm, act).subscribe({
                next: value => {
                  this._snackBar.open(s1);
                  this.setActionNom(nn, to_act, tek_nom);
                },
                error: value => {
                  this._snackBar.open(s2);
                }
              })
            }
          })
        }
      }
    }
  }



}
