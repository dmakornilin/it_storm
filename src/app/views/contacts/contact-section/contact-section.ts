import {Component, inject} from '@angular/core';
import {BaseParams} from '../../../core/settings/params';
import {NavigateService} from '../../../shared/services/navigate-service';
import {EmailService} from '../../../shared/services/email-service';
import {ModalNavigateService} from '../../../shared/services/modal-navigate-service';

@Component({
  selector: 'app-contact-section',
  imports: [],
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection {
  phone=BaseParams.phone;
  email=BaseParams.email;
  address=BaseParams.address;

  private readonly modalSrv = inject(ModalNavigateService);
  private readonly navigateSrv = inject(NavigateService);
  private readonly emailService = inject(EmailService);

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
