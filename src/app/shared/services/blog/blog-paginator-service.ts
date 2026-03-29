import { inject, Injectable, signal} from '@angular/core';
import {CategListSelected, CategoriesListType, CategorySelectedType} from '../../../../types/articles/categories.type';
import {CategoriesService} from '../preload/categories-service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class BlogPaginatorService {

  private readonly categorySrv = inject(CategoriesService);
  private readonly route = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);


  pageAmount = signal<number>(0);
  currentPage = signal<number>(0);
  selectedCtg = signal<CategListSelected>([]);

  blogParamsFlag=signal<boolean>(false);


  getUrlParams(): string {
    let ss = '';
    if (this.currentPage() > 0) {
      ss = '?page=' + this.currentPage();
      this.selectedCtg().forEach(category => {
        if (category.isSelected) {
          ss += '&categories[]=' + category.url;
        }
      })
    }
    return ss;
  }

  remove_category_choice(ctg: CategorySelectedType): void {
    this.selectedCtg.update(new_select =>
      new_select.map(itm =>
        itm.url === ctg.url
          ? {...itm, isSelected: false}
          : itm
      )
    )
  }

  refreshSelectedCtg() {
    this.blogParamsFlag.set(false);
    this.categorySrv.loadingCtg().subscribe({
      next: data => {
        let new_items: CategListSelected = [];
        (data as CategoriesListType).forEach(itm => {
            const url = itm.url;
            let key = this.route.snapshot.queryParams[url];
            let ff = false;
            if (key && key === 'set') {
              ff = true;
            }
            let ctg = new CategorySelectedType(itm.name, url, ff);
            new_items.push(ctg);
          }
        )
        this.selectedCtg.set(new_items);
        this.blogParamsFlag.set(true);
      },
          error: error => {
            this._snackBar.open('Ошибка загрузки категорий');
          }
    })
  }


}
