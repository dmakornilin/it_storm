import {Component, effect, inject, input, Input} from '@angular/core';
import {NavigateService} from '../../services/navigate-service';
import {MENU_NOTHING_INDEX} from './main-menu-index';

@Component({
  selector: 'app-main-menu',
  imports: [

  ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})



export class MainMenu {
  private readonly navigateSrv = inject(NavigateService);
  protected item_selected =MENU_NOTHING_INDEX;
  public readonly isNavigated = input.required<boolean>();


  to_click(itm_id:number) {
    this.navigateSrv.setSelected(itm_id);
 }

  constructor() {
    effect(() => {
      const newIndex = this.navigateSrv.menuSelect();
      this.item_selected = newIndex;
    });
  }


}

