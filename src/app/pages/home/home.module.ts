import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from '../../app-routing.module';

import { DescriptionComponent } from "../home/description/description.component";
import { HomeComponent } from "./home/home.component";
import { MatIconModule } from '@angular/material/icon';
import { HomeRoutingModule } from "./home-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    DescriptionComponent,
    HomeComponent,
    HomePageComponent,
  
  ],
  imports: [
    CommonModule,
    MatIconModule, 
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
