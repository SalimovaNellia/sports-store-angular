import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { CartDetailComponent } from './store/cartDetail.component';
import { CheckoutComponent } from './store/checkout.component';
import { StoreFirstGuard } from "./storeFirst.guard";

const routes: Routes = [
  { path: "store", 
    component: StoreComponent, 
    canActivate: [StoreFirstGuard] },
  { path: "cart", 
    component: CartDetailComponent,
    canActivate: [StoreFirstGuard] },
  { path: "checkout", 
    component: CheckoutComponent,
    canActivate: [StoreFirstGuard]
  },
  { path: "**", redirectTo: "/store" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
