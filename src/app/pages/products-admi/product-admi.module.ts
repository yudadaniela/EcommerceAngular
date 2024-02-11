import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BrowserModule } from '@angular/platform-browser';
// import { AppRoutingModule } from '../../app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';


import { AdmiComponent } from '../products-admi/home-admi/admi.component';
import { ModalComponent } from '../products-admi/modal-create-edit/modal.component';
import { ModalDeleteComponent } from '../products-admi/modal-delete/modal-delete.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule } from "@angular/material/select";
import {MatButtonModule } from "@angular/material/button";
import {MatDatepickerModule } from "@angular/material/datepicker";
import {MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductsAdmiRoutingModule } from './products-admi-routing.module';


@NgModule({
  declarations: [
    AdmiComponent,
    ModalComponent,
    ModalDeleteComponent
  ],
  imports: [
    CommonModule,
    ProductsAdmiRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatSnackBarModule

  ]
})
export class ProductAdmiModule { }
