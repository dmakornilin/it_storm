import {Component, computed, inject} from '@angular/core';
import {BlogPaginatorService} from '../../../shared/services/blog/blog-paginator-service';

@Component({
  selector: 'app-blog-paginator',
  imports: [],
  templateUrl: './blog-paginator.html',
  styleUrl: './blog-paginator.scss',
})
export class BlogPaginator {
  private readonly paginatorSrv=inject(BlogPaginatorService);

  protected readonly getAmounts = computed(() => {
    return this.paginatorSrv.pageAmount();
  })

  protected readonly getCurrent = computed(() => {
    return this.paginatorSrv.currentPage();
  })

  getNumbers():number[] {
    const nn=this.getAmounts();
    if (nn>=1) {
      return Array.from({length: nn}, (_, i) => i + 1);
    } else {return []}
  }

  set_page_selected(page:number) {
    this.paginatorSrv.currentPage.set(page);
  }
}
