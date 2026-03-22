import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderCard} from './order-card/order-card';
import {ThankCard} from './thank-card/thank-card';

const order_routes: Routes = [
  {path: 'order', component:OrderCard },
  {path: 'thanks', component:ThankCard },
];

@NgModule({
  imports: [RouterModule.forChild(order_routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
