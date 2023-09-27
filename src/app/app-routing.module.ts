import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { AdmiComponent } from './product-admi/admi/admi.component';
import { ShoppingComponent } from './shopping-card/shopping/shopping.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent },
  {path: 'login', component:LoginComponent},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'administration', component: AdmiComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
