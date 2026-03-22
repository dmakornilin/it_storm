import {Component, inject} from '@angular/core';
import {AdvantageService} from '../../../shared/services/preload/advantage-service';
import {AdvantageCard} from '../advantage-card/advantage-card';

@Component({
  selector: 'app-advantage-section',
  imports: [
    AdvantageCard
  ],
  templateUrl: './advantage-section.html',
  styleUrl: './advantage-section.scss',
})
export class AdvantageSection {
  advantageService= inject(AdvantageService);
  advantageList =this.advantageService.advantages();
}
