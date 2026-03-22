import {Component, effect, inject} from '@angular/core';
import {BlogChoice} from '../blog-choice/blog-choice';
import {BlogPaginator} from '../blog-paginator/blog-paginator';
import {BlogArticlesService} from '../../../shared/services/blog/blog-articles-service';
import {ArticleItemType} from '../../../../types/articles/article-item.type';
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
export class BlogPage {

   private readonly articlesSrv = inject(BlogArticlesService);
   private readonly blockPaginSrv=inject(BlogPaginatorService);

  getArticles():ArticleItemType[] {
    return this.articlesSrv.articles().items;
  }


  constructor() {
    effect((prm) => {
      const pageSignal=this.blockPaginSrv.currentPage;
      this.articlesSrv.loading();
    });
  }
}
