import {PriceListType} from '../price_list/price-list.type';

export interface ActionItemType {
  type :PriceListType;
  caption:string;
  title_html:string;
  description:string|null;
  image  :string;
}

export type ActionItems = ActionItemType[];
