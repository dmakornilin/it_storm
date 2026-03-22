import {Component, effect, inject, Input} from '@angular/core';
import {NavigateService} from '../../services/navigate-service';

@Component({
  selector: 'app-main-menu',
  imports: [

  ],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss',
})
export class MainMenu {

 @Input() isNavigated = false;

 navigateSrv = inject(NavigateService);


 item_selected =-10;


  to_click(itm_id:number,rtUrl:string) {
    this.navigateSrv.setSelected(itm_id);
 }

  constructor() {
    effect(() => {
      const newIndex = this.navigateSrv.menuSelect();
      this.item_selected = newIndex;
    });
  }


}

