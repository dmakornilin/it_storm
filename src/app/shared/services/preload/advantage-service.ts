import {Injectable, signal} from '@angular/core';
import {AdvantageList} from '../../../../types/advantages/advantage-item.type';

@Injectable({
  providedIn: 'root',
})
export class AdvantageService {
  public advantages = signal<AdvantageList>([]);

  constructor() {
    this.loading();
  }

  loading() {
    this.advantages.set([
      {
        id:1,
        title: 'Мастерски вовлекаем аудиториюв процесс.',
        info: 'Мы увеличиваем процент вовлечённости за короткий промежуток времени.'
      },
      {
        id:2,
        title: 'Разрабатываем бомбическую визуальную концепцию.',
        info: 'Наши специалисты знают как создать уникальный образ вашего проекта.'
      },
      {
        id:3,
        title: 'Создаём мощные воронки с помощью текстов.',
        info: 'Наши копирайтеры создают не только вкусные текста, но и классные воронки.'
      },
      {
        id:4,
        title: 'Помогаем продавать больше.',
        info: 'Мы не только помогаем разработать стратегию по продажам, но также корректируем её под нужды заказчика.'
      },

    ])
  }
}
