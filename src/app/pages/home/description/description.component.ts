import { ProductHome } from 'src/app/Models/products-home';
import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ItemCar } from '../../../Models/cart-items';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  itemCar: ProductHome | undefined;
  subscription!: Subscription;

  constructor(
    private apiService: ApiProductsService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  addCart(item: ProductHome) {
    let shopping: ItemCar = {
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
    };
    this.cartService.addToCartLocalStorage(shopping);
    this.cartService.total();
    this.cartService.counter();
  }

  ngOnInit(): void {
    const id: number | null = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.apiService.getDataId(id).subscribe((data) => {
      this.itemCar = data;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  isAuthentication() {
    return this.authService.isAuthentication();
  }
}
