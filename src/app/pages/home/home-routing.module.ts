import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-principal/home.component';

const routes:Routes=[
  {path: 'home',
  component:HomeComponent},
  {path: 'description/:id',
  component:HomeComponent},
  {path: '**',
  component:HomeComponent}, 
]
@NgModule({
  
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class HomeRoutingModule { }
