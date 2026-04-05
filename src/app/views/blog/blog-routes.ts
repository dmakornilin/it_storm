import {  Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {path: 'blog',   loadComponent: ()=> import('./blog-page').then( c => c.BlogPage) },
  {path: 'article', loadComponent: ()=> import('./blog-article').then( c =>  c.BlogArticle) },
];

