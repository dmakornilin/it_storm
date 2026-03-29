import {Component, computed, inject, OnInit} from '@angular/core';
import {CategFilters} from '../categ-filters/categ-filters';
import {
  CategorySelectedType
} from '../../../../types/articles/categories.type';
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
  private readonly blogPaginatorService = inject(BlogPaginatorService);

  public selectedCtg = computed(()=> this.blogPaginatorService.selectedCtg());

  protected remove_category_choice(ctg:CategorySelectedType):void {
    this.blogPaginatorService.remove_category_choice(ctg);
  }


  ngOnInit() {
    this.blogPaginatorService.refreshSelectedCtg();
  }


}
