import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CounterComponent } from './shared/components/counter/counter.component'

import { HomeModule } from "./pages/home/home.module";
import { LoginModule } from "./pages/auth/login.module";
import { ProductAdmiModule } from "./pages/products-admi/product-admi.module";
import { ShoppingCardModule } from "./pages/shopping-card/shopping-card.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideFirebaseApp,  initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../assets/environments/environments';
import { AngularFireModule } from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CounterComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule,
    HomeModule,
    LoginModule,
    ProductAdmiModule,
    ShoppingCardModule,
    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideAuth(() => getAuth()),
    
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
