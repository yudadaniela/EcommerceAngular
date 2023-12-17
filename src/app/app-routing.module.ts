import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home/home.component';
import { LoginComponent } from './pages/login/login/login.component';
import { AdmiComponent } from './pages/products-admi/home-admi/admi.component';
import { ShoppingComponent } from './pages/shopping-card/shopping/shopping.component';
import { SignUpComponent } from './pages/login/sign-up/sign-up.component';
import { DescriptionComponent } from './pages/home/description/description.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent },
  {path: 'description/:id', component:DescriptionComponent },
  {path: 'login', component:LoginComponent},
  {path: 'sign-up', component:SignUpComponent},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'administration', component: AdmiComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
