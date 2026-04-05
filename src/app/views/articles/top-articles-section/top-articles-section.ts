import {Component, computed, inject} from '@angular/core';
import {PopularArticlesService} from '../../../shared/services/preload/popular-articles-service';
import {TopArticleCard} from '../top-article-card/top-article-card';
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
  private readonly navigateSrv= inject(NavigateService);
  protected readonly topArticles = computed(()=>this.topArticleSrv.popularArticles() )


  protected to_blog() {
    this.navigateSrv.to_blog();
  }

}
