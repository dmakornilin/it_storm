import {Component, computed, effect, inject, ViewEncapsulation} from '@angular/core';
import {BlogArticleItemService} from '../../../shared/services/blog/blog-article-item-service';
import {ArticleCommentItem} from '../../../../types/articles/article-detail.type';
import {TopArticleCard} from '../../articles/top-article-card/top-article-card';
import {NavigateService} from '../../../shared/services/navigate-service';
import {AuthService} from '../../../core/auth/auth-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
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
    ClickOutsideDirective,
    SpinLoader,
    CommentCard
  ],
  templateUrl: './blog-article.html',
  styleUrl: './blog-article.scss',
  encapsulation: ViewEncapsulation.None
})
export class BlogArticle {

  private readonly  authService = inject(AuthService);
  private readonly blogArticleSrv = inject(BlogArticleItemService);
  private readonly navigateSrv = inject(NavigateService);
  private readonly commentSrv = inject(CommentsService);
  private readonly routeAct = inject(ActivatedRoute);

  protected articleUrl: string = '';
  protected comments: ArticleCommentItem[] = [];
  protected check_flag: boolean = true;
  protected comment = '';



  protected readonly isCommentsLoading = computed(() => this.blogArticleSrv.isCommentLoad());
  protected readonly isEditable =computed(() => this.authService.isLogin());
  protected readonly comments_list =computed(()=>this.blogArticleSrv.comments() );
  protected readonly totalComments = computed(()=>this.blogArticleSrv.totalCommentsCount() );

  protected readonly getArticleInfo =computed(()=> this.blogArticleSrv.articleDetailInfo());
  protected readonly getRelatedArticles =computed(()=> this.blogArticleSrv.relatedArticles());


  protected to_login() {
    this.navigateSrv.to_login();
  }

  protected to_signup() {
    this.navigateSrv.to_signup();
  }

  protected post_comment()
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

  protected load_next_comments() {
    this.blogArticleSrv.load_article_comments();
  }


  protected setCheckflag(ff: boolean) {
    this.check_flag = ff;
  }

  protected to_blog(): void {
      this.navigateSrv.to_blog();
  }

  protected imageUrl(): string {
    if (this.getArticleInfo()) {
      return './images/data/' + this.getArticleInfo()?.image
    } else return '';
  }

  refresh(u: string): void {
    this.articleUrl=u;
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
