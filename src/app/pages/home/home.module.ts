import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from '../../app-routing.module';

import { DescriptionComponent } from "../home/description/description.component";
import { HomeComponent } from "./home-principal/home.component";
import { MatIconModule } from '@angular/material/icon';
import { HomeRoutingModule } from "./home-routing.module";



@NgModule({
  declarations: [
    DescriptionComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    MatIconModule, 
    HomeRoutingModule
  ]
})
export class HomeModule { }
