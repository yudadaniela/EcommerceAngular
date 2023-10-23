import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './components/counter/counter.component'

import { HomeModule } from "./home/home.module";
import { LoginModule } from "./login/login.module";
import { ProductAdmiModule } from "./product-admi/product-admi.module";
import { ShoppingCardModule } from "./shopping-card/shopping-card.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CounterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    HomeModule,
    LoginModule,
    ProductAdmiModule,
    ShoppingCardModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
