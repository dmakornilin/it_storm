export interface ArticleItemType {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date | null;
  category: string;
  url: string;
}


export interface ArticlePrm {
  id: string;
  url: string;
}
