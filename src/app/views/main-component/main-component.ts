import {Component, inject} from '@angular/core';
import {LoginService} from '../../shared/services/login-service';
import {StorageAuthinfoService} from '../../core/common-srv/storage-authinfo-service';
import {AuthService} from '../../core/auth/auth-service';
import {PriceListSection} from '../price-list/price-list-section/price-list-section';
import {AdvantageSection} from '../advantages/advantage-section/advantage-section';
import {ActionsList} from '../actions/actions-list/actions-list';
import {CategoriesService} from '../../shared/services/preload/categories-service';
import {PopularArticlesService} from '../../shared/services/preload/popular-articles-service';
import {TopArticlesSection} from '../articles/top-articles-section/top-articles-section';
import {ReviewsSlider} from '../reviews/reviews-slider/reviews-slider';
import {ContactSection} from '../contacts/contact-section/contact-section';

@Component({
  selector: 'app-main-component',
  imports: [
    PriceListSection,
    AdvantageSection,
    ActionsList,
    TopArticlesSection,
    ReviewsSlider,
    ContactSection
  ],
  templateUrl: './main-component.html',
  styleUrl: './main-component.scss',
})
export class MainComponent {

  private readonly loginService = inject(LoginService);
  private readonly authService = inject(AuthService);
  private readonly saveAuthService= inject(StorageAuthinfoService);

  private readonly categSrv = inject(CategoriesService);
  private readonly popularArticlesSrv = inject(PopularArticlesService);



}
