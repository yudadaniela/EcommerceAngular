import { Injectable } from '@angular/core';
import { ItemCar } from '../Models/cart-items';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  car: ItemCar[] = [];
  totalProduct: number[] = [];
  counterN: number[] = [];
  constructor() {
  }

  addToCartLocalStorage(product: ItemCar) {
    const itemRepite = this.car.find((p) => p.id === product.id);

    if (itemRepite) {
      itemRepite.quantity += 1;
    } else {
      this.car.push(product);
    }
    localStorage.setItem('car', JSON.stringify(this.car));
  }
  
  total(): number {
    this.totalProduct = this.car.map((p) => p.quantity * p.price);
    //console.log(this.totalProduct);
    //console.log(this.totalProduct.reduce((total, product) =>total + product, 0));
    return this.totalProduct.reduce((total, product) => total + product, 0);
  }
  counter(): number {
    this.counterN = this.car.map((p) => p.quantity);
    return this.counterN.reduce((total, product) => total + product, 0);
  }

  getToLocalStorage() {
    return this.car;
  }
 
  clearById(){
    Object.keys(localStorage).forEach(key => {
      //Comprueba si la clave coincide con alguna condición
      console.log(key);
      
      if (key.endsWith("id")) {
          // Elimina el par clave-valor
          console.log(localStorage.removeItem(key));
          
          localStorage.removeItem(key);
      }
  });
  }

  clearCart() {
    this.car = [];
    localStorage.clear();
  }
}
