import {Component, Input} from '@angular/core';
import {ReviewItem} from '../../../../types/reviews/review-item.type';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
  @Input() review: ReviewItem | null = null;

  imageUrl():string{
    if (this.review) {
      return './images/pages/reviews/' + this.review.image;
    } else return '';
  }

}
