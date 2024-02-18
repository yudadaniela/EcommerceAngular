import { Component, EventEmitter, Output } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../../Models/user';
import { ToggleService } from 'src/app/services/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user:User|null=null
  
  constructor(
    private cartService: CartService,
    private router:Router,
    private authService:AuthService,
    private toggleService:ToggleService
    ) {}
  
  shoppingCounter(): number {
    return this.cartService.counter();
  }
  
  isHomePage():boolean{
   return this.router.url==='/home'
  }

  currentUser(){
    this.user = this.authService.getUser()
    return this.user
  }
  signOff(){
    console.log(this.authService.logout());
    this.router.navigate([''])
    return this.authService.logout()
  }
  toggleSiderBar(){
    return this.toggleService.toggleSiderBar()
  }
}
