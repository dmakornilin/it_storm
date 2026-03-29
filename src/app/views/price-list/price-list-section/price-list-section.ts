import {Component, computed, inject} from '@angular/core';
import {PriceService} from '../../../shared/services/preload/price-service';
import {PriceListCard} from '../price-list-card/price-list-card';

@Component({
  selector: 'app-price-list-section',
  imports: [
    PriceListCard
  ],
  templateUrl: './price-list-section.html',
  styleUrl: './price-list-section.scss',
})
export class PriceListSection {
  priceService=inject(PriceService);
  priceList = computed(()=>this.priceService.priceList());

}
