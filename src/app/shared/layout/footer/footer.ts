import {Component, inject} from '@angular/core';
import {MainMenu} from "../../components/main-menu/main-menu";
import {RouterLink} from "@angular/router";
import {BaseParams} from '../../params';
import {NavigateService} from '../../services/navigate-service';
import {EmailService} from '../../services/email-service';

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
