import {Component, inject} from '@angular/core';
import {BaseParams} from '../../../shared/params';
import {NavigateService} from '../../../shared/services/navigate-service';
import {EmailService} from '../../../shared/services/email-service';

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

  private readonly navigateSrv = inject(NavigateService);
  private readonly emailService = inject(EmailService);

  to_consult() {
    this.navigateSrv.to_order_consult();
  }
  to_email() {
    this.emailService.openEmailClient(
      this.email,
      'Заказать бесплатную консултацию',
      ''
    )
  }

}
