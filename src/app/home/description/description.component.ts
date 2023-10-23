import { ProductHome } from 'src/app/interfaces/products-home';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemCar } from "../../interfaces/cart-items";


@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  itemCar:ProductHome|undefined
  subscription!: Subscription;
  
  constructor(
    private apiService:ApiServiceService,
    private cartService: CartService,
    private route: ActivatedRoute,
  ){ 
    
  }
 
  addCart(item:ProductHome){
    let shopping: ItemCar = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
    };
    this.cartService.addToCartLocalStorage(shopping);
    this.cartService.total();
    this.cartService.counter()

    
  }

  ngOnInit(): void {
    const id: number | null = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.apiService.getDataId(id).subscribe((data)=>{
    this.itemCar=data
    })

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
