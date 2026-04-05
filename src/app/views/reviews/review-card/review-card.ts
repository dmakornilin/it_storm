import {Component, computed, input} from '@angular/core';
import {ReviewItem} from '../../../../types/reviews/review-item.type';

@Component({
  selector: 'app-review-card',
  imports: [],
  templateUrl: './review-card.html',
  styleUrl: './review-card.scss',
})
export class ReviewCard {
   readonly review = input.required<ReviewItem>();
   protected readonly imageUrl = computed(()=>{
     return './images/pages/reviews/' + this.review().image;
   })

}
