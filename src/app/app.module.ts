import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from './login/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AdmiComponent } from './product-admi/admi/admi.component';
import { HomeComponent } from './home/home/home.component';
import { ShoppingComponent } from './shopping-card/shopping/shopping.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../app/product-admi/modal/modal.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule } from "@angular/material/select";
import {MatButtonModule } from "@angular/material/button";
import {MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AdmiComponent,
    ShoppingComponent,
    ModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
