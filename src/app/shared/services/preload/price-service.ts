import {Injectable, signal} from '@angular/core';
import {PriceListCardList} from '../../../../types/price_list/price-list-card.type';
import {PriceListType} from '../../../../types/price_list/price-list.type';

@Injectable({
  providedIn: 'root',
})
export class PriceService {
  public priceList= signal<PriceListCardList>([]);

  constructor() {
    this.loading();
  }

  getPriceListType(url:string):string | null {
    if (url==='designe') {return PriceListType.designe}
    if (url==='promoution') {return PriceListType.promoution}
    if (url==='advertising') {return PriceListType.advertising}
    if (url==='copyright') {return PriceListType.copyright}
    return null;
  }

  loading() {
    this.priceList.set([
      {
        pl_type: PriceListType.designe,
        image: 'designe.png',
        price: 7500,
        title: 'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
        url:'designe'
      },
      {
        pl_type: PriceListType.promoution,
        image: 'promoution.png',
        price: 3500,
        title: 'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
        url:'promoution'
      },
      {
        pl_type: PriceListType.advertising,
        image: 'advertising.png',
        price: 1000,
        title: 'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
        url:'advertising'
      },
      {
        pl_type: PriceListType.copyright,
        image: 'copyright.png',
        price: 750,
        title: 'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
        url: 'copyright'
      },
    ])
  }

}
