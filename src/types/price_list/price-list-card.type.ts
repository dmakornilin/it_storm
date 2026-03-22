import {PriceListType} from './price-list.type';

export type PriceListCardType = {
  pl_type: PriceListType,
  image: string,
  price: number,
  title:string,
  url:string,
}

export type PriceListCardList = PriceListCardType[];
