import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Login} from './login/login';
import {Signup} from './signup/signup';
import {Agreement} from './agreement/agreement';
import {PersData} from './pers-data/pers-data';

const user_routes: Routes = [
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'agreement', component: Agreement},
  {path: 'persdata', component: PersData},
];

@NgModule({
  imports: [RouterModule.forChild(user_routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
