import {Component, computed, effect, inject, OnInit} from '@angular/core';
import {BlogChoice} from '../blog-choice/blog-choice';
import {BlogPaginator} from '../blog-paginator/blog-paginator';
import {BlogArticlesService} from '../../../shared/services/blog/blog-articles-service';
import {TopArticleCard} from '../../articles/top-article-card/top-article-card';
import {BlogPaginatorService} from '../../../shared/services/blog/blog-paginator-service';

@Component({
  selector: 'app-blog-page',
  imports: [
    BlogChoice,
    BlogPaginator,
    TopArticleCard
  ],
  templateUrl: './blog-page.html',
  styleUrl: './blog-page.scss',
})
export class BlogPage implements OnInit {

   private readonly articlesSrv = inject(BlogArticlesService);
   private readonly blogPaginatorSrv = inject(BlogPaginatorService);
   protected readonly getArticles = computed(()=>this.articlesSrv.articles().items);

   ngOnInit() {
     this.articlesSrv.loading();
   }

   constructor() {
     effect(() => {
       const flg = this.blogPaginatorSrv.blogParamsFlag();
       if (flg) {
         this.articlesSrv.loading();
       }
     });
   }
}
