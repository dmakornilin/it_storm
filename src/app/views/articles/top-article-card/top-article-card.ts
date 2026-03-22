import {Component, inject, Input} from '@angular/core';
import {ArticleItemType} from '../../../../types/articles/article-item.type';
import {NavigateService} from '../../../shared/services/navigate-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-article-card',
  imports: [],
  templateUrl: './top-article-card.html',
  styleUrl: './top-article-card.scss',
})
export class TopArticleCard {
 @Input() article: ArticleItemType | null =null;
   private readonly navigateSrv =inject(NavigateService);
  private readonly  router = inject(Router);

 image_path():string | null {
   if (this.article) {
     return './images/pages/articles/'+this.article.image;
   } else { return null}
 }


  navigate_article() {
    const url= this.article?.url;
    if (url) { this.navigateSrv.to_blogArticle(url); }
  }
}
