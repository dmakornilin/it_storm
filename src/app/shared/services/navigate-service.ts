import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {
  MENU_ABOUT_INDEX,
  MENU_ARTICLE_INDEX, MENU_CONTACTS_INDEX, MENU_NOTHING_INDEX,
  MENU_REVIEW_INDEX,
  MENU_SERVICE_INDEX
} from '../components/main-menu/main-menu-index';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {
  private readonly router = inject(Router);

  menuSelect = signal<number>(MENU_NOTHING_INDEX);
  articleUrl = signal<string>('');
  setArtRefresh = signal<boolean>(false);
  orderTypeSelected =signal<string>('');
  orderSelectedService =signal<string>('');


  public setSelected(selected: number) {
    if (selected === MENU_SERVICE_INDEX) {
      this.router.navigate(['/'],
        {fragment: 'priceList'});
    }
    if (selected === MENU_ABOUT_INDEX) {
      this.router.navigate(['/'],
        {fragment: 'about'});
    }
    if (selected === MENU_ARTICLE_INDEX) {
      this.router.navigate(['/'],
        {fragment: 'articles'});
    }
    if (selected === MENU_REVIEW_INDEX) {
      this.router.navigate(['/'],
        {fragment: 'reviews'});
    }
    if (selected === MENU_CONTACTS_INDEX) {
      this.router.navigate(['/'],
        {fragment: 'contacts'});
    }
    this.menuSelect.set(selected);
  }

  public to_main() {
    this.menuSelect.set(MENU_NOTHING_INDEX);
    this.router.navigate(['/']);
  }

  public to_blog() {
    this.router.navigate(['/blog']);
  }

  public to_blogArticle(url: string) {
    this.router.navigate(['article'], {queryParams: {url: url}});
    this.articleUrl.set(url);
  }

  public to_login() {
    this.menuSelect.set(MENU_NOTHING_INDEX);
    this.router.navigate(['/login']);
  }

  public to_agreement() {
    this.menuSelect.set(MENU_NOTHING_INDEX);
    this.router.navigate(['/agreement']);
  }

  public to_persdata() {
    this.menuSelect.set(MENU_NOTHING_INDEX);
    this.router.navigate(['/persdata']);
  }

  public to_signup() {
    this.menuSelect.set(MENU_NOTHING_INDEX);
    this.router.navigate(['/signup']);
  }

}
