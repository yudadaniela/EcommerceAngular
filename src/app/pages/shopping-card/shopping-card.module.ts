import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingComponent } from '../shopping-card/shopping/shopping.component';

import { ShoppingCardRoutingModule } from './shopping-card-routing.module';

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
