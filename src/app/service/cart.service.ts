import { Injectable } from '@angular/core';
import { ItemCar } from '../interface/item-Cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  car: ItemCar[] = [];
  constructor() {
    // let carLocalStorage=localStorage.getItem('car')
    // if (carLocalStorage){
    //   this.car=JSON.parse(carLocalStorage)
    // }
  }

  addToCartLocalStorage(product: ItemCar) {
    const itemRepite = this.car.find((p) => p.id === product.id);
    if (itemRepite) {
      itemRepite.quantity += 1;
    } else {
      this.car.push(product);
    }
    localStorage.setItem('car', JSON.stringify(this.car));
    
    let total=this.car
    
  }
  
  getToLocalStorage() {
    return this.car;
  }

  clearCart() {
    this.car = [];
    localStorage.removeItem('car');
  }
}
