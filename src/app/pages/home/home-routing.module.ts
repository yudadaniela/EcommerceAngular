import { DescriptionComponent } from './description/description.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes:Routes=[
  {path: '',
  component:HomePageComponent},
  {path: 'homeProducts',
  component:HomeComponent},
  {path: 'description/:id',
  component:DescriptionComponent}
   
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
