import {Injectable, signal} from '@angular/core';
import {CategListSelected} from '../../../../types/articles/categories.type';

@Injectable({
  providedIn: 'root',
})
export class BlogPaginatorService {
  pageAmount=signal<number>(0);
  currentPage=signal<number>(0);
  selectedCtg = signal<CategListSelected>([]);


  getUrlParams():string{
    let ss='';
    if (this.currentPage()>0) {
       ss='?page='+this.currentPage();
       this.selectedCtg().forEach(category=>{
         if (category.isSelected) {
           ss+='&categories[]='+category.url;
         }
       })
    }
    return ss;
  }
}
