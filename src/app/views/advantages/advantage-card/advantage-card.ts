import {Component, Input, input} from '@angular/core';
import {AdvantageItemType} from '../../../../types/advantages/advantage-item.type';

@Component({
  selector: 'app-advantage-card',
  imports: [],
  templateUrl: './advantage-card.html',
  styleUrl: './advantage-card.scss',
})
export class AdvantageCard {
  @Input() advantage: AdvantageItemType | null  = null;
}
