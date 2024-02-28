import { Subscriber, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { HomeComponent } from '../../home/home/home.component';
import { ItemCar } from '../../../Models/cart-items';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent {
  totalCart: number = 0;
  constructor(private cartService: CartService) {
    this.totalUpdate();
  }
  getShoppingCart() {
    return this.cartService.getToLocalStorage();
  }
  clearShoppinCart() {
    this.cartService.clearCart();
    this.totalCart = 0;
  }
  totalUpdate() {
    this.totalCart = this.cartService.total();
  }
  deleteByItem(){
    return this.cartService.clearById()
  }
}
