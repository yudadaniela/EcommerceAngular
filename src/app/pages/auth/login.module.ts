
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegionFormComponent } from './components/region-form/region-form.component';
import { RoutingAuthModule } from "./routing-auth.module";


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    RegionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    RoutingAuthModule
  ],
  providers:[
    {provide:RegionFormComponent, useClass:RegionFormComponent}]
})
export class LoginModule { }
