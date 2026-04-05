import {Component, computed, inject, input} from '@angular/core';
import {ActionItemType} from '../../../../types/actions/action-item.type';
import {NavigateService} from '../../../shared/services/navigate-service';
import {ModalNavigateService} from '../../../shared/services/modal-navigate-service';

@Component({
  selector: 'app-action-card',
  imports: [],
  templateUrl: './action-card.html',
  styleUrl: './action-card.scss',
})
export class ActionCard{

  private readonly navigateSrv = inject(NavigateService);
  private readonly modalSrv = inject(ModalNavigateService);


  protected readonly dataChanged = false;
  protected readonly imageUrl = computed(()=> {
    return './images/pages/actions/' + this.action()?.image;
    }
  )

  public readonly action =input <ActionItemType>();


  protected to_order() {
    this.navigateSrv.to_main();
    this.modalSrv.toOrderService('');
  }

}
