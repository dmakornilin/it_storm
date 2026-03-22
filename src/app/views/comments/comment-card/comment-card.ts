import {Component, inject, Input} from '@angular/core';
import {ArticleCommentItem} from '../../../../types/articles/article-detail.type';
import {DatePipe} from '@angular/common';
import {CommentActionCard} from '../comment-action-card/comment-action-card';

@Component({
  selector: 'app-comment-card',
  imports: [
    DatePipe,
    CommentActionCard
  ],
  templateUrl: './comment-card.html',
  styleUrl: './comment-card.scss',
})
export class CommentCard {

 @Input() comment: ArticleCommentItem | null =null;
 @Input() nomerItem:number | null= null;


  imageUrl(): string {
      return './images/system/avatar.png';
  }

}
