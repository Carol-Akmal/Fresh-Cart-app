import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../../core/model/product/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[] , word:string): product[] {
    return productList.filter ((item)=> item.title.toLowerCase().includes(word.toLocaleLowerCase()));
  }

}
