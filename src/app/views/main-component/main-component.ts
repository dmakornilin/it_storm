import {Component} from '@angular/core';
import {PriceListSection} from '../price-list/price-list-section/price-list-section';
import {AdvantageSection} from '../advantages/advantage-section/advantage-section';
import {ActionsList} from '../actions/actions-list/actions-list';
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

}
