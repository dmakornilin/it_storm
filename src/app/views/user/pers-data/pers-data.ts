import {Component, inject} from '@angular/core';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-pers-data',
  imports: [],
  templateUrl: './pers-data.html',
  styleUrl: './pers-data.scss',
})
export class PersData {
  private readonly navigateSrv = inject(NavigateService);

  to_agreement():void {
    this.navigateSrv.to_agreement();
  }
}
