import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { admiGuard } from './guards/admi.guard';
import { homeProductsGuard } from './guards/home-products.guard';
import { shoppingGuard } from './guards/shopping.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./pages/shopping-card/shopping-card.module').then(
        (m) => m.ShoppingCardModule
      ),
      canActivate:[shoppingGuard]
  },
  {
    path: 'admi',
    loadChildren: () =>
      import('./pages/products-admi/product-admi.module').then(
        (m) => m.ProductAdmiModule
      ),
      canActivate:[admiGuard]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
