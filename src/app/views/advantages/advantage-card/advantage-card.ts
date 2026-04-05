import {Component, input, Input} from '@angular/core';
import {AdvantageItemType} from '../../../../types/advantages/advantage-item.type';

@Component({
  selector: 'app-advantage-card',
  imports: [],
  templateUrl: './advantage-card.html',
  styleUrl: './advantage-card.scss',
})
export class AdvantageCard {
   public readonly advantage = input.required<AdvantageItemType>();
}
