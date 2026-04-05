import {Component, inject} from '@angular/core';
import {ModalNavigateService} from '../../../shared/services/modal-navigate-service';

@Component({
  selector: 'app-thank-card',
  imports: [
  ],
  templateUrl: './thank-card.html',
  styleUrl: './thank-card.scss',
})
export class ThankCard {

  private readonly modalSrv = inject(ModalNavigateService);


  to_close() {
      this.modalSrv.closeModal();
  }

}
