import {Component, effect, inject, OnInit} from '@angular/core';
import {NavigateService} from '../../../shared/services/navigate-service';
import {ActivatedRoute} from '@angular/router';
import {RequestTypeTitles} from '../../../shared/params';
import {PriceService} from '../../../shared/services/preload/price-service';
import {PriceListCardList, PriceListCardType} from '../../../../types/price_list/price-list-card.type';
import {ClickOutsideDirective} from '../../../shared/directives/click-outside';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/auth/auth-service';
import {NgStyle} from '@angular/common';
import {OrdersService} from '../../../shared/services/orders/orders-service';
import {ParamToOrderType} from '../../../../types/orders/param-toorder.type';

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

  protected orderForm: FormGroup;

  private readonly navigateSrv = inject(NavigateService);
  private readonly routeAct = inject(ActivatedRoute);
  private readonly priceSrv = inject(PriceService);
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrdersService);


  fb = inject(FormBuilder);
  orderType: string = '';
  orderTitle: string = '';
  currentUrl: string = '';
  currentSelectFlag: boolean = false;
  currentValue: string | null = null;
  isLogin: boolean = false;
  errorPost = false
  prm: ParamToOrderType | null = null;


  getPriceList(): PriceListCardList {
    return this.priceSrv.priceList();
  }

  getTitleByUrl(url: string): string | null {
    return this.priceSrv.getPriceListType(url);
  }

  setChoice(itm: PriceListCardType) {
    this.currentUrl = itm.url;
    this.currentValue = this.priceSrv.getPriceListType(itm.url);
    this.currentSelectFlag = false;
  }

  isOrder():boolean {
    let tp=this.orderType;
    return (tp==='order');
  }

  postOrder(): void {
    this.prm = null;
    let yy = true;
    this.errorPost = false;
    if (this.orderForm.valid && this.orderForm.value.name && this.orderForm.value.phone && this.orderType && this.orderType.length > 1) {
      if (this.currentValue) {
        this.prm = {
          name: this.orderForm.value.name,
          phone: this.orderForm.value.phone,
          type: this.orderType,
          service: this.currentValue
        }
      } else this.navigateSrv.to_order_thanks();
    }
    if (this.prm) {
      this.errorPost = false;
      this.orderService.setOrderRequest(this.prm).subscribe(order => {
        if (order.error) {
          yy = order.error
        }
        this.errorPost = yy;
        if (yy) {
          this.navigateSrv.to_order_thanks();
        }
      })
    } else {
      this.errorPost = true;
  }
}

refresh_order()
:
void {
  const tps
:
string = this.routeAct.snapshot.queryParams['tps'];
const wid: string = this.routeAct.snapshot.queryParams['stp'];
this.errorPost = false;
this.prm = null;
this.orderType = tps;

if (tps === 'order') {
  this.orderTitle = RequestTypeTitles.order
}
if (tps === 'consultation') {
  this.orderTitle = RequestTypeTitles.consultation;
  this.navigateSrv.tosbros_cons_flag();
}
this.currentUrl = wid;
this.currentValue = this.priceSrv.getPriceListType(wid);

const nameControl = this.orderForm.get('name');
this.isLogin = this.authService.isLogin();
if (this.isLogin) {
  const name = this.authService.userInfo()?.name;
  if (name) {
    if (nameControl) {
      nameControl.setValue(name)
    }
  }
} else {
  if (nameControl) {
    nameControl.setValue('');
  }
}
}

ngOnInit()
{
  this.refresh_order();
}

to_open_select()
{
  this.currentSelectFlag = true;
}

hideFlagChoice()
{
  this.currentSelectFlag = false;
}

to_main()
{
  this.navigateSrv.to_main();
}


constructor()
{
  this.orderForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });
  effect(() => {
    const flagSignal = this.navigateSrv.setOrderRefresh;
    const flag = flagSignal();
    if (flag) {
      this.refresh_order();
    }
  });

}
}
