import { EventEmitter, Injectable } from '@angular/core';
import { ApiProductsService } from './api-products.service';
import { ProductHome } from 'src/app/Models/products-home';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  searchEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  emitSearch(item: string) {
    this.searchEvent.emit(item);
  }
  filterBySearch(data: ProductHome[], searchItem: string) {
    if (!data || !searchItem) {
      return data;
    } else {
      return data.filter(
        (item) =>
          item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchItem.toLowerCase())
      );
    }
  }
  
}
