import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  // {
  //   path: 'sign-up',
  //   loadChildren: () =>
  //     import('./pages/auth/login.module').then((m) => m.LoginModule),
  // },
  {
    path: 'shopping',
    loadChildren: () =>
      import('./pages/shopping-card/shopping-card.module').then(
        (m) => m.ShoppingCardModule
      ),
  },
  {
    path: 'admi',
    loadChildren: () =>
      import('./pages/products-admi/product-admi.module').then(
        (m) => m.ProductAdmiModule
      ),
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
