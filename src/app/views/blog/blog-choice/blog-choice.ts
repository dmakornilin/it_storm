import {Component, effect, inject, OnInit} from '@angular/core';
import {CategFilters} from '../categ-filters/categ-filters';
import {
  CategListSelected,
  CategorySelectedType
} from '../../../../types/articles/categories.type';
import {CategoriesService} from '../../../shared/services/preload/categories-service';
import {ActivatedRoute,  Router} from '@angular/router';
import {BlogPaginatorService} from '../../../shared/services/blog/blog-paginator-service';

@Component({
  selector: 'app-blog-choice',
  imports: [
    CategFilters
  ],
  templateUrl: './blog-choice.html',
  styleUrl: './blog-choice.scss',
})
export class BlogChoice implements OnInit {
  categorySrv= inject(CategoriesService);
  private readonly route = inject(ActivatedRoute);
  private readonly  router = inject(Router);
  private readonly blogPaginatorService = inject(BlogPaginatorService);


  selectedCtg():CategListSelected {
    return this.blogPaginatorService.selectedCtg();
  }

  remove_category_choice(ctg:CategorySelectedType):void {
    this.blogPaginatorService.selectedCtg.update(new_select =>
      new_select.map( itm =>
        itm.url === ctg.url
          ? { ...itm, isSelected:false}
          :itm
      )
    )
  }

  refresh(ff:boolean):void {
    if (ff) {
      let new_items: CategListSelected = [];
      this.categorySrv.categories().forEach(itm => {
        const url = itm.url;
        let ff=false;
        let key= this.route.snapshot.queryParams[url];
        if (key && key==='set') { ff=true;}
         let ctg = new  CategorySelectedType( itm.name, url, ff );
         new_items.push(ctg);
      });
      this.blogPaginatorService.selectedCtg.set(new_items);

    }
  }

  ngOnInit() {
    if (this.categorySrv.categories().length === 0) {
      this.categorySrv.loading();
    }
    this.refresh(true);

  }


  constructor() {
    effect(() => {
      const sgn = this.categorySrv.flagCtg;
      this.refresh(sgn());
    });
  }

}
