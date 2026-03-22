import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogPage} from './blog-page/blog-page';
import {BlogArticle} from './blog-article/blog-article';

const blog_routes: Routes = [
  {path: 'blog', component:BlogPage},
  {path: 'article', component:BlogArticle},
];

@NgModule({
  imports: [RouterModule.forChild(blog_routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
