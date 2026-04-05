import { Routes } from '@angular/router';

export const USER_ROUTES: Routes = [
  {path: 'login', loadComponent: ()=> import('./login').then( c => c.Login )},
  {path: 'signup', loadComponent: ()=> import('./signup').then( c => c.Signup)},
  {path: 'agreement', loadComponent: ()=> import('./agreement').then( c => c.Agreement)},
  {path: 'persdata', loadComponent: ()=> import('./pers-data').then( c => c.PersData)},
];
