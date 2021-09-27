import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./home/product-list/product-list-routing.module').then( m => m.ProductListPageRoutingModule)
  },
  {
    path: 'code-discount',
    loadChildren: () => import('./home/code-discount/code-discount-routing.module').then( m => m.CodeDiscountPageRoutingModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order-routing.module').then( m => m.OrderPageRoutingModule)
  },
  {
    path: 'order-list',
    loadChildren: () => import('./order/order-list/order-list.module').then( m => m.OrderListPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
