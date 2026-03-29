import { Routes } from '@angular/router';
import {Layout} from './shared/layout/layout';
import {authForwardGuard} from './core/auth/auth-forward-guard';
import {MainComponent} from './views/main-component/main-component';
import {OrderCard} from './views/orders/order-card/order-card';
import {ThankCard} from './views/orders/thank-card/thank-card';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {path: '', component: MainComponent},
      {path: '', loadChildren: () => import('./views/user/user-routing-module').then(m => m.UserRoutingModule),canActivate:[authForwardGuard]},
      {path: '', loadChildren:() => import('./views/blog/blog-routing-module').then(m => m.BlogRoutingModule)},
    ]
  },
  {path: 'order', component: OrderCard},
  {path: 'thanks', component: ThankCard},
];
