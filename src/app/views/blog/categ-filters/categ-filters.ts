import {Component, computed, inject,  signal} from '@angular/core';
import {
  CategorySelectedType
} from '../../../../types/articles/categories.type';
import {ClickOutsideDirective} from '../../../shared/directives/click-outside';
import {Params, Router} from '@angular/router';
import {BlogPaginatorService} from '../../../shared/services/blog/blog-paginator-service';

@Component({
  selector: 'app-categ-filters',
  templateUrl: './categ-filters.html',
  styleUrl: './categ-filters.scss',
  imports: [
    ClickOutsideDirective
  ]
})
export class CategFilters {
  isMenuOpen= signal<boolean>(false);

  private readonly router = inject(Router);
  private readonly blogPaginatorService = inject(BlogPaginatorService);
  public selectedCtg = computed(()=> this.blogPaginatorService.selectedCtg());

  get_categ_char(ctg:CategorySelectedType):string {
    if (ctg.isSelected) { return '-'} else return '+';
  }

  change_category_choice(ctg:CategorySelectedType):void {
    let ff:boolean=true;
    if (ctg.isSelected) { ff=false;}
    let prm_list:Params=[];
    let yy=false;
    this.selectedCtg().forEach((itm)=>{
      yy = itm.isSelected;
      if (itm.url===ctg.url) { yy=ff }
      if (yy) { prm_list[itm.url]='set';    }
    });
    this.router.navigate(['blog'],{ queryParams: prm_list });
    this.blogPaginatorService.refreshSelectedCtg();
  }

  hideMenu() {
    if (this.isMenuOpen()) {this.isMenuOpen.set(false);}
  }

  to_change_flag(flg:boolean):void {
     this.isMenuOpen.set(flg);
  }
}
