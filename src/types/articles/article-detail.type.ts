import {UserInfoType} from '../common/user_info.type';

export interface ArticleCommentItem {
  id: string;
  text: string;
  date: Date,
  likesCount: number;
  dislikesCount: number;
  user: UserInfoType,
  nomer?: number
}

export type ArticleDetailType = {
  text: string;
  comments: ArticleCommentItem[];
  commentsCount: number;
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  category: string;
  url: string;
}


export type TopArticleComments = {
  allCount: number;
  comments: ArticleCommentItem[];
}
