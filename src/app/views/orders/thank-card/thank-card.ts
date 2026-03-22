import {Component, inject} from '@angular/core';
import {NavigateService} from '../../../shared/services/navigate-service';

@Component({
  selector: 'app-thank-card',
  imports: [],
  templateUrl: './thank-card.html',
  styleUrl: './thank-card.scss',
})
export class ThankCard {
  private readonly navigateSrv = inject(NavigateService);

  to_main() {
    this.navigateSrv.to_main();
  }

}
