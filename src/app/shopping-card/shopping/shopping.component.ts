import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home/home.component';
import { ItemCar } from '../../interface/item-Cart';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent  {
  constructor(private cartService: CartService) {}
getShoppingCart(){
  return this.cartService.getToLocalStorage()
}
clearShoppinCart(){
  this.cartService.clearCart()
}  
}
