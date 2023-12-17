import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CounterComponent } from './shared/components/counter/counter.component'

import { HomeModule } from "./pages/home/home.module";
import { LoginModule } from "./pages/login/login.module";
import { ProductAdmiModule } from "./pages/products-admi/product-admi.module";
import { ShoppingCardModule } from "./pages/shopping-card/shopping-card.module";

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
