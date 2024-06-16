import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MakeOrderComponent } from './make-order/make-order.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'make-order',
    component: MakeOrderComponent,
    canActivate: [authGuard], // Protect this route
  },
  {
    path: 'product-order',
    component: ProductOrderComponent,
    canActivate: [authGuard], // Protect this route
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
