import {Injectable, signal} from '@angular/core';
import {ActionItems} from '../../../../types/actions/action-item.type';
import {PriceListType} from '../../../../types/price_list/price-list.type';

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  public actions = signal<ActionItems>([]);

  constructor() {
    this.loading();
  }

  loading() {
    this.actions.set([
      {
        type: PriceListType.promoution,
        caption: 'Предложение месяца',
        title_html: 'Продвижение в Instagram для вашего бизнеса <span class="text-mark">-15%</span>!',
        description: null,
        image: 'action_1.png'
      },
      {
        type: PriceListType.copyright,
        caption: 'Акция',
        title_html: 'Нужен грамотный <span  class="text-mark">копирайтер</span>?',
        description: 'Весь декабрь у нас действует акция на работу копирайтера.',
        image: 'action_2.png'
      },
      {
        type: PriceListType.advertising,
        caption: 'Новость дня',
        title_html: '<span  class="text-mark">6 место</span> в ТОП-10 SMM-агенств Москвы!',
        description: 'Мы благодарим каждого, кто голосовал за нас!',
        image: 'action_3.png'
      },
    ]);
  }
}
