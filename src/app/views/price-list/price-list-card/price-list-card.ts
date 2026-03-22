import {Component, inject, Input} from '@angular/core';
import {PriceListCardType} from '../../../../types/price_list/price-list-card.type';
import {CurrencyPipe} from '@angular/common';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-price-list-card',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './price-list-card.html',
  styleUrl: './price-list-card.scss',
})
export class PriceListCard {
 @Input() card: PriceListCardType | null =null;

 navigateSrv = inject(NavigateService);

 image_file():string{
   if (this.card) {
     return './images/pages/price_list/' + this.card.image;
   } else {return ''}
 }


 to_order():void {
   if (this.card) {
     this.navigateSrv.to_order(this.card.url);
   }
 }
}
