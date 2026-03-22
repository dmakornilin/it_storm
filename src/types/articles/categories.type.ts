export interface CategoriesItemType {
  id: string;
  name: string;
  url: string;
}

export type CategoriesListType = CategoriesItemType[];

export class CategorySelectedType  {
  constructor (
    public readonly name: string,
    public readonly url: string,
    public readonly isSelected: boolean
  ){}
}

export type CategListSelected = CategorySelectedType[];
