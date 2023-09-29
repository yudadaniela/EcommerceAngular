import { Component, OnInit } from '@angular/core';
import { HomeComponent } from "../../home/home/home.component";
import { ItemCar } from "../../interface/item-Cart";

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  
  listShoppingCar:ItemCar[]|undefined
  
  ngOnInit(): void {
    let carStorage=localStorage.getItem('car') as string
    let car=JSON.parse(carStorage)
    this.listShoppingCar=car
  }
}
