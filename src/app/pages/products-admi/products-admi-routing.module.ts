import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmiComponent } from '../products-admi/home-admi/admi.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
{
path:'',
component:AdmiComponent
}
]

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
export class ProductsAdmiRoutingModule { }
