import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping/shopping.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[{
  path: '',
  component:ShoppingComponent
  }]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ], 
  exports:[
    RouterModule
  ]
})
export class ShoppingCardRoutingModule { }
