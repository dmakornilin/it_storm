/**
 * Сервис открывает модальные окна - заказ (консультация телефон,  заявка на услугу),
 * toPhoneConsult()  -- модальное окно Заявка на бесплатную консультацию
 * окно "Спасибо"
 * toThanksModal()
 */

import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ThankCard} from '../../views/orders/thank-card/thank-card';
import {OrderCard} from '../../views/orders/order-card/order-card';
import {NavigateService} from './navigate-service';

@Injectable({
  providedIn: 'root',
})
export class ModalNavigateService {

  private readonly dialogSrv = inject(MatDialog);
  private readonly navigateSrv = inject(NavigateService);

  private currentComponentRef: any;


  closeModal() {
    if (this.currentComponentRef) {
      this.currentComponentRef.close();
    }
  }

  toOrderService(srvTp: string) {
    let selectedService =srvTp;
    if (srvTp==='') { selectedService='designe'}
    this.navigateSrv.orderTypeSelected.set('order');
    this.navigateSrv.orderSelectedService.set(selectedService)
    this.currentComponentRef = this.dialogSrv.open(OrderCard,
      {
        minWidth: '727px',
        height: '493px',
        panelClass: 'panel-class-dialog',
        closeOnNavigation: true,
      }
    );


  }

  toPhoneConsult() {
    if (this.currentComponentRef) {
      this.currentComponentRef.close();
    }
    this.navigateSrv.orderTypeSelected.set('consultation');
    this.currentComponentRef = this.dialogSrv.open(OrderCard,
      {
        minWidth: '727px',
        height: '493px',
        panelClass: 'panel-class-dialog',
        closeOnNavigation: true,
      }
      );
  }

  toThanksModal() {
    if (this.currentComponentRef) {
      this.currentComponentRef.close();
    }
    this.currentComponentRef = this.dialogSrv.open(ThankCard,
      {
        minWidth: '727px',
        height: '493px',
        panelClass: 'panel-class-dialog',
        closeOnNavigation: true
      });
  }
}
