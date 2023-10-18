import { ProductHome } from 'src/app/interface/products-home';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';
import { ItemCar } from "../../interface/item-Cart";
import { CounterComponent } from '../../components/counter/counter.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
  car:ProductHome|undefined
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
    this.car=data
    })

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
