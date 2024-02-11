import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home-principal/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { AdmiComponent } from './pages/products-admi/home-admi/admi.component';
import { ShoppingComponent } from './pages/shopping-card/shopping/shopping.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { DescriptionComponent } from './pages/home/description/description.component';
import { HomeModule } from './pages/home/home.module';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path: 'home', component:HomeComponent },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },

  // {path: 'description/:id', component:DescriptionComponent },

  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./pages/shopping-card/shopping-card.module').then(
        (m) => m.ShoppingCardModule
      ),
  },
  // {path: 'shopping', component: ShoppingComponent},
  // {path: 'administration', component: AdmiComponent},
  {
    path: 'administration',
    loadChildren: () =>
      import('./pages/products-admi/product-admi.module').then(
        (m) => m.ProductAdmiModule
      ),
  },
  // {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
