import {Component, computed, inject, input} from '@angular/core';
import {PriceListCardType} from '../../../../types/price_list/price-list-card.type';
import {CurrencyPipe} from '@angular/common';
import {ModalNavigateService} from '../../../shared/services/modal-navigate-service';

@Component({
  selector: 'app-price-list-card',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './price-list-card.html',
  styleUrl: './price-list-card.scss',
})
export class PriceListCard {
  private readonly modalSrv = inject(ModalNavigateService);
  protected readonly image_file = computed(()=> {
    return './images/pages/price_list/' + this.card().image; } )
  public readonly card = input.required<PriceListCardType>();

  to_order():void {
      this.modalSrv.toOrderService(this.card().url);
 }
}
