import {inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigateService {

  menuSelect = signal<number>(-10);
  private readonly router = inject(Router);
  articleUrl = signal<string>('');
  setArtRefresh = signal<boolean>(false);
  setOrderRefresh = signal<boolean>(false);


  setSelected(selected: number) {
    if (selected === 0) {
      this.router.navigate(['/'],
        {fragment: 'priceList'});
    }
    if (selected === 1) {
      this.router.navigate(['/'],
        {fragment: 'about'});
    }
    if (selected === 2) {
      this.router.navigate(['/'],
        {fragment: 'articles'});
    }
    if (selected === 3) {
      this.router.navigate(['/'],
        {fragment: 'reviews'});
    }
    if (selected === 4) {
      this.router.navigate(['/'],
        {fragment: 'contacts'});
    }
    this.menuSelect.set(selected);
  }

  public to_main() {
    this.menuSelect.set(-10);
    this.router.navigate(['/']);
  }

  public to_blog() {
    this.router.navigate(['/blog']);
  }

  public to_blogArticle(url: string) {
    this.router.navigate(['article'], {queryParams: {url: url}});
    this.articleUrl.set(url);
  }


  public tosbros_cons_flag() {
    this.setOrderRefresh.set(false)
  }

  public to_order_consult() {
    this.setOrderRefresh.set(true)
    this.menuSelect.set(-10);
    this.router.navigate(['order'], {queryParams: {tps: 'consultation'}});
  }

  public to_order(srvTp: string) {
    this.menuSelect.set(-10);
    let ss = srvTp;
    if (srvTp === '') {
      ss = 'designe'
    }
    this.router.navigate(['order'], {queryParams: {tps: 'order', stp: ss}});
  }

  public to_order_thanks() {
    this.menuSelect.set(-10);
    this.router.navigate(['/thanks']);
  }

  public to_login() {
    this.menuSelect.set(-10);
    this.router.navigate(['/login']);
  }

  public to_agreement() {
    this.menuSelect.set(-10);
    this.router.navigate(['/agreement']);
  }

  public to_persdata() {
    this.menuSelect.set(-10);
    this.router.navigate(['/persdata']);
  }

  public to_signup() {
    this.menuSelect.set(-10);
    this.router.navigate(['/signup']);
  }

}
