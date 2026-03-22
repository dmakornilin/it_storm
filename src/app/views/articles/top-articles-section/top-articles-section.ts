import {Component, inject} from '@angular/core';
import {PopularArticlesService} from '../../../shared/services/preload/popular-articles-service';
import {TopArticleCard} from '../top-article-card/top-article-card';
import {PopularArticleType} from '../../../../types/articles/popular-article.type';
import {Router} from '@angular/router';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-top-articles-section',
  imports: [
    TopArticleCard
  ],
  templateUrl: './top-articles-section.html',
  styleUrl: './top-articles-section.scss',
})
export class TopArticlesSection {
  topArticleSrv = inject(PopularArticlesService);
  private readonly  router = inject(Router);
  private readonly navigateSrv= inject(NavigateService);

  topArticles():PopularArticleType {
    return this.topArticleSrv.popularArticles();
  }

  to_blog() {
    this.navigateSrv.to_blog();
  }

}
