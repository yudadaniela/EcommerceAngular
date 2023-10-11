import { ApiServiceService } from './../../service/api-service.service';
import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ProductHome } from 'src/app/interface/products-home';
import { ItemCar } from '../../interface/item-Cart';
import { JsonPipe } from '@angular/common';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any;
  constructor(
    private cartService: CartService,
    private apiService: ApiServiceService
  ) {}

  addToCar(item: ProductHome) {
    //console.log('entro');
    let shopping: ItemCar = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
    };
    //console.log('shopping');

    this.cartService.addToCartLocalStorage(shopping);
    this.cartService.total();
    this.cartService.counter()
  }

  ngOnInit(): void {
    this.apiService.getData().subscribe((respond) => {
      this.data = respond;
      //console.log(respond);
    });
  }
}
