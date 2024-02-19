import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { HomeModule } from "./pages/home/home.module";
import { LoginModule } from "./pages/auth/login.module";
import { ProductAdmiModule } from "./pages/products-admi/product-admi.module";
import { ShoppingCardModule } from "./pages/shopping-card/shopping-card.module";
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { provideFirebaseApp,  initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../assets/environments/environments';
import { AngularFireModule } from "@angular/fire/compat";
import { ErrorInterceptor } from './interceptors/error.interceptor';



@NgModule({
  declarations: [
    AppComponent,     
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule,
    SharedModule,
    HomeModule,
    LoginModule,
    ProductAdmiModule,
    ShoppingCardModule,
    provideFirebaseApp(() => initializeApp( environment.firebase )),
    provideAuth(() => getAuth()),
    
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
