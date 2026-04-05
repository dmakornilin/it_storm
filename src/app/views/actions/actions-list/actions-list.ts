import {Component, inject} from '@angular/core';
import {ActionService} from '../../../shared/services/preload/action-service';
import {ActionItemType} from '../../../../types/actions/action-item.type';
import {ActionCard} from '../action-card/action-card';

@Component({
  selector: 'app-actions-list',
  imports: [
    ActionCard,
  ],
  templateUrl: './actions-list.html',
  styleUrl: './actions-list.scss',
})
export class ActionsList {
  private readonly actionService = inject(ActionService);
  protected readonly actions= this.actionService.actions();

  currentItem=0;



  next_item() {
    if (this.currentItem!=(this.actions.length-1)) {
        this.currentItem++
    } else this.currentItem=0;
  }

  prev_item() {
    if (this.currentItem!=0) {this.currentItem-- } else this.currentItem=2;
  }

  currentItemLink() : ActionItemType | undefined {
    if ( (this.actions.length> this.currentItem) && (this.currentItem>=0)) {
      return this.actions[this.currentItem];
    } else return undefined
  }

  to_choice(itm:number):void {
    this.currentItem=itm;
  }




}
