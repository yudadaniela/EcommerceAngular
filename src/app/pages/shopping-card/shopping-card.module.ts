import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingComponent } from '../shopping-card/shopping/shopping.component';

import { ShoppingCardRoutingModule } from './shopping-card-routing.module';
import { shoppingGuard } from 'src/app/guards/shopping.guard';

@NgModule({
  declarations: [
    ShoppingComponent
  ],
  imports: [
   CommonModule,
   ShoppingCardRoutingModule
  ]
})
export class ShoppingCardModule { }
