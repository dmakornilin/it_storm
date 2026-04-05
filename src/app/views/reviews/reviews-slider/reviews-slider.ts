import {Component, inject, signal} from '@angular/core';
import {ReviewService} from '../../../shared/services/preload/review-service';
import {ReviewItem} from '../../../../types/reviews/review-item.type';
import {ReviewCard} from '../review-card/review-card';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-reviews-slider',
  imports: [
     ReviewCard,
  ],
  templateUrl: './reviews-slider.html',
  styleUrl: './reviews-slider.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsSlider {
  private readonly reviewSrv = inject(ReviewService);
  protected readonly index = signal(0);

  startItem =0;



  getItemLink(nom:number):ReviewItem {
    let index= this.startItem + nom;
    const nn=this.reviewSrv.reviews().length-1;
    return  this.reviewSrv.reviews()[index];
  }

  last_slide():boolean {
    const nn=this.reviewSrv.reviews().length-3;
    return (nn==this.startItem);
  }

  next_slide():void {
    if (this.startItem < (this.reviewSrv.reviews().length-3))  {this.startItem++}  else {this.startItem=0}
  }

  prev_slide():void {
    if (this.startItem !=0) { this.startItem--; } else { this.startItem=this.reviewSrv.reviews().length-3}
  }

}
