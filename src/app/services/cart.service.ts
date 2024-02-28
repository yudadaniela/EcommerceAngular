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
 
  clearById(id:number){
    let carrito=JSON.parse(localStorage.getItem('car') ?? '[]')
    let index=carrito.findIndex((product:ItemCar)=>product.id===id)
    if(index!==-1){
     carrito.slice(index,1)
     localStorage.setItem('car',JSON.stringify(carrito))
     console.log('se borro del carrito');
     
    }else{
      console.log('no se encontro el id');
      
    }
  }

  clearCart() {
    this.car = [];
    localStorage.clear();
  }
}
