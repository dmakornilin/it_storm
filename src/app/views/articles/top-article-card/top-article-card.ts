import {Component, computed, inject, input, Input} from '@angular/core';
import {ArticleItemType} from '../../../../types/articles/article-item.type';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-top-article-card',
  imports: [],
  templateUrl: './top-article-card.html',
  styleUrl: './top-article-card.scss',
})
export class TopArticleCard {

  private readonly navigateSrv =inject(NavigateService);
  protected readonly image_path = computed(()=> {
      return './images/pages/articles/' + this.article().image;
    }
  )
  public readonly article = input.required<ArticleItemType>();

  navigate_article() {
     this.navigateSrv.to_blogArticle(this.article().url);
  }
}
