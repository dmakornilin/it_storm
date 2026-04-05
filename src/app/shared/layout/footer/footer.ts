import {Component, inject} from '@angular/core';
import {MainMenu} from "../../components/main-menu/main-menu";
import {RouterLink} from "@angular/router";
import {BaseParams} from '../../../core/settings/params';
import {NavigateService} from '../../services/navigate-service';
import {EmailService} from '../../services/email-service';
import {ModalNavigateService} from '../../services/modal-navigate-service';

@Component({
  selector: 'app-footer',
    imports: [
        MainMenu,
        RouterLink
    ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  email=BaseParams.email;
  phone=BaseParams.phone;
  address=BaseParams.address;
  private readonly emailService = inject(EmailService);
  private readonly modalSrv = inject(ModalNavigateService);
  private readonly navigateSrv = inject(NavigateService);

  to_consult() {
    this.navigateSrv.to_main();
    this.modalSrv.toPhoneConsult();
  }


  to_email() {
    this.emailService.openEmailClient(
      this.email,
      'Заказать бесплатную консультацию',
      ''
      )
  }
}
