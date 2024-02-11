import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../auth/login/login.component";
import { SignUpComponent } from "../auth/sign-up/sign-up.component";
import { CommonModule } from '@angular/common';


const routes:Routes=[
  {path: '',
   component:LoginComponent},
   {path: 'login',
   component:LoginComponent},
   {path: 'sign-up',
   component:SignUpComponent},
 
]
@NgModule({
 
  imports: [
  CommonModule,
   RouterModule.forChild(routes)
  ],
  exports:[
   RouterModule
  ]
})
export class RoutingAuthModule { }
