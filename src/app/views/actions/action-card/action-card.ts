import {Component, inject, Input} from '@angular/core';
import {ActionItemType} from '../../../../types/actions/action-item.type';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-action-card',
  imports: [],
  templateUrl: './action-card.html',
  styleUrl: './action-card.scss',
})
export class ActionCard  {
  @Input() action: ActionItemType | null = null;

  private readonly navigateSrv = inject(NavigateService);


  imageUrl(): string {
    if (this.action) {
      return './images/pages/actions/' + this.action.image;
    } else return '';
  }

  to_order() {
    this.navigateSrv.to_order('');
  }

}
