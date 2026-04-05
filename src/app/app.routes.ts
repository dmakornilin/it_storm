import { Routes } from '@angular/router';
import {Layout} from './shared/layout/layout';
import {authForwardGuard} from './core/auth/auth-forward-guard';
import {OrderCard} from './views/orders/order-card/order-card';
import {ThankCard} from './views/orders/thank-card/thank-card';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {path: '', loadComponent: () => import('./views/main-component/main-component').
         then(m => m.MainComponent)  },
      {path: '', loadChildren: () => import('./views/user/user-routes').then(m => m.USER_ROUTES),canActivate:[authForwardGuard]},
      {path: '', loadChildren:() => import('./views/blog/blog-routes').then(m => m.BLOG_ROUTES)},
    ]
  },
  {path: 'order', component: OrderCard},
  {path: 'thanks', component: ThankCard},
];
