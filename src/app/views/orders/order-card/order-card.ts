import {Component, computed, inject, OnInit} from '@angular/core';
import {NavigateService} from '../../../shared/services/navigate-service';
import {RequestTypeTitles} from '../../../core/settings/params';
import {PriceService} from '../../../shared/services/preload/price-service';
import {PriceListCardType} from '../../../../types/price_list/price-list-card.type';
import {ClickOutsideDirective} from '../../../shared/directives/click-outside';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/auth-service';
import {NgStyle} from '@angular/common';
import {OrdersService} from '../../../shared/services/orders/orders-service';
import {ParamToOrderType} from '../../../../types/orders/param-toorder.type';
import {ModalNavigateService} from '../../../shared/services/modal-navigate-service';

@Component({
  selector: 'app-order-card',
  imports: [
    ClickOutsideDirective,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './order-card.html',
  styleUrl: './order-card.scss',
})
export class OrderCard implements OnInit {

  private readonly navigateSrv = inject(NavigateService);
  private readonly priceSrv = inject(PriceService);
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrdersService);
  private readonly modalSrv = inject(ModalNavigateService);



  protected readonly isLogin =computed(() => {return this.authService.isLogin()});

  protected readonly ordTypeSelected = computed(() => {
    return this.navigateSrv.orderTypeSelected()
  })
  protected readonly isSelectOrder = computed(() => {
    return this.ordTypeSelected() === 'order'
  });
  protected readonly currentOrderTitle = computed(() => {
    if (this.isSelectOrder()) {
      return RequestTypeTitles.order
    } else {
      return RequestTypeTitles.consultation;
    }
  });

  protected readonly getPriceList = computed(() => {
    return this.priceSrv.priceList(); });

  protected orderForm: FormGroup;
  protected  fb = inject(FormBuilder);

  protected currentUrl: string = '';
  protected currentSelectFlag: boolean = false;
  protected currentValue: string | null = null;
  protected errorPost = false


  to_close() {
    this.modalSrv.closeModal();
  }




  getTitleByUrl(url: string): string | null {
    return this.priceSrv.getPriceListType(url);
  }

  setChoice(itm: PriceListCardType) {
    this.currentUrl = itm.url;
    this.currentValue = this.priceSrv.getPriceListType(itm.url);
    this.currentSelectFlag = false;
  }


  post_consultation() {
    if (this.orderForm.valid && this.orderForm.value.name && this.orderForm.value.phone) {
      this.modalSrv.toThanksModal();
    } else { this.errorPost = true; }
  }

  postOrder(): void {
    let prm: ParamToOrderType | null = null;
    this.errorPost = false;
    if (this.isSelectOrder()) {
      if (this.orderForm.valid && this.orderForm.value.name && this.orderForm.value.phone && this.currentValue) {
        prm = {
          name: this.orderForm.value.name,
          phone: this.orderForm.value.phone,
          type: this.ordTypeSelected(),
          service: this.currentValue
        }
          this.orderService.setOrderRequest(prm).subscribe(order => {
            if (order.error) {
              this.errorPost = true;
            } else {
              this.modalSrv.toThanksModal();
            }
          })
      }  else {
        this.errorPost = true;
      }
    }
      else {  this.post_consultation(); }
  }


  refresh_form() {
   if (this.isLogin()) {
     const nameControl = this.orderForm.get('name');
     const name = this.authService.userInfo()?.name;
     if (name) {
       if (nameControl) {
         nameControl.setValue(name)
       }
     }
   }
    this.currentUrl=this.navigateSrv.orderSelectedService();
    this.currentValue = this.priceSrv.getPriceListType(this.currentUrl);
  }


  ngOnInit() {
     this.refresh_form();
  }

  to_open_select() {
    this.currentSelectFlag = true;
  }

  hideFlagChoice() {
    this.currentSelectFlag = false;
  }


  constructor() {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });

  }
}
