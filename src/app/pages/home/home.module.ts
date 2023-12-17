import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../../app-routing.module';

import { DescriptionComponent } from "../home/description/description.component";
import { HomeComponent } from "../home/home/home.component";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    DescriptionComponent,
    HomeComponent,
    
  ],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule
  ]
})
export class HomeModule { }
