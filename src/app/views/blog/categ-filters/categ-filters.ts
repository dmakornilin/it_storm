import {Component, inject, Input, signal} from '@angular/core';
import {
  CategListSelected,
  CategorySelectedType
} from '../../../../types/articles/categories.type';
import {CategoriesService} from '../../../shared/services/preload/categories-service';
import {ClickOutsideDirective} from '../../../shared/directives/click-outside';
import {Params, Router} from '@angular/router';
import {NavigateService} from '../../../shared/services/navigate-service';

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
  private readonly categorySrv= inject(CategoriesService);
  private readonly navigateSrv= inject(NavigateService);


  @Input() selectedCtg: CategListSelected | null = null;


  get_categ_char(ctg:CategorySelectedType):string {
    if (ctg.isSelected) { return '-'} else return '+';
  }

  change_category_choice(ctg:CategorySelectedType):void {
    let ff:boolean=true;
    if (ctg.isSelected) { ff=false;}
     let prm_list:Params=[];

    if (this.selectedCtg) {
      this.selectedCtg.forEach(itm=>{
        let yy = itm.isSelected;
        if (itm.url===ctg.url) { yy=ff }
        if (yy) { prm_list[itm.url]='set';    }
      })
    }
    this.router.navigate(['blog'],{ queryParams: prm_list });
    this.navigateSrv.setSelected(2);
    this.categorySrv.loading();

  }

  hideMenu() {
    if (this.isMenuOpen()) {this.isMenuOpen.set(false);}
  }

  to_change_flag(flg:boolean):void {
     this.isMenuOpen.set(flg);
  }
}
