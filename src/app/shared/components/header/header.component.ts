import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private cartService: CartService,
    private router:Router
    ) {}
  
  shoppingCounter(): number {
    return this.cartService.counter();
  }

  isHomePage():boolean{
   return this.router.url==='/home'
  }
  handdle(searchItem:string){
  console.log('termino de la busqueda', searchItem);
  
  }
}
