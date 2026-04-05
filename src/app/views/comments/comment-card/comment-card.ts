import {Component, computed, Input, input} from '@angular/core';
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
  @Input() nomerItem:number | null= null;
  public readonly comment =input.required<ArticleCommentItem>();

  protected readonly imageUrl = computed(()=>{
    return './images/system/avatar.png';
  })


}
