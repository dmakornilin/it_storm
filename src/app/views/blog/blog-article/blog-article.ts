import {Component, effect, inject, ViewEncapsulation} from '@angular/core';
import {BlogArticleItemService} from '../../../shared/services/blog/blog-article-item-service';
import {ArticleCommentItem, ArticleDetailType} from '../../../../types/articles/article-detail.type';
import {PopularArticleType} from '../../../../types/articles/popular-article.type';
import {TopArticleCard} from '../../articles/top-article-card/top-article-card';
import {NavigateService} from '../../../shared/services/navigate-service';
import {AuthService} from '../../../core/auth/auth-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {CommentItemType} from '../../../../types/comments/comment-item.type';
import {ClickOutsideDirective} from '../../../shared/directives/click-outside';
import {CommentsService} from '../../../shared/services/comments/comments-service';
import {SpinLoader} from '../../../shared/components/spin-loader/spin-loader';
import {CommentCard} from '../../comments/comment-card/comment-card';

@Component({
  selector: 'app-blog-article',
  imports: [
    TopArticleCard,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ClickOutsideDirective,
    SpinLoader,
    CommentCard
  ],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.scss',
  encapsulation: ViewEncapsulation.None
})
export class BlogArticle {

  authService = inject(AuthService);
  private readonly blogArticleSrv = inject(BlogArticleItemService);
  private readonly navigateSrv = inject(NavigateService);
  private readonly commentSrv = inject(CommentsService);
  articleUrl: string = '';
  articleTitle: string = '';
  comments: ArticleCommentItem[] = [];
  isEditable: boolean = false;
  check_flag: boolean = true;
  comment = '';

  private readonly routeAct = inject(ActivatedRoute);
  isCommentLoad():boolean {
    return this.blogArticleSrv.isCommentLoad();
  }

  to_login() {
    this.navigateSrv.to_login();
  }
  to_signup() {
    this.navigateSrv.to_signup();
  }

  post_comment()
  :
    void {
      this.check_flag = (this.comment.length >= 1);
    if (this.check_flag) {
      const art_id = this.blogArticleSrv.articleId();
      const url = this.articleUrl;
      if (art_id.length > 1 && url.length > 1) {
        const prm: CommentItemType = {text: this.comment, article: art_id};
        this.commentSrv.set_comment(prm,art_id);
        this.comment = '';
      }
    }
  }

  load_next_comments() {
    this.blogArticleSrv.load_article_comments();
  }

  comments_list(): ArticleCommentItem[] {
    return this.blogArticleSrv.comments();
  }

  totalComments(): number {
    return this.blogArticleSrv.totalCommentsCount();
  };

  setCheckflag(ff: boolean) {
    this.check_flag = ff;
  }

  to_blog(): void {
    this.navigateSrv.to_blog();
  }

  imageUrl(): string {
    if (this.getArticleInfo()) {
      return './images/data/' + this.getArticleInfo()?.image
    } else return '';
  }

  getArticleInfo(): ArticleDetailType | null {
    return this.blogArticleSrv.articleDetailInfo();
  }

  getRelatedArticles(): PopularArticleType {
    return this.blogArticleSrv.relatedArticles();
  }


  refresh(u: string): void {
    this.isEditable = this.authService.isLogin();
    this.articleUrl = u;
    this.blogArticleSrv.load_article_info(u);
    this.blogArticleSrv.load_related_articles(u);
  }

  constructor() {
    effect(() => {
      const urlSgn = this.navigateSrv.articleUrl;
      let u = urlSgn();

      if (u.length<1) {
        const page=  this.routeAct.snapshot.queryParams['url'];
        if (page) {u=page as string}
        // console.log(page);
      }
      const flg = this.navigateSrv.setArtRefresh();
      if (u.length > 1) {
        if (!(u === this.articleUrl) || flg) {
          this.refresh(u);
          if (flg) {
            this.navigateSrv.setArtRefresh.set(false)
          }
        }
      } else this.navigateSrv.to_blog();
    });
  }
}
