import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./body/product/product.component";
import { LoginComponent } from "./login/login.component";
import { BodyComponent } from "./body/body.component";
import { AuthGuard } from "./auth/auth.guard";
import { OrderUserComponent } from './body/order-user/order-user.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: BodyComponent,
    children: [
      {
        path: "product",
        component: ProductComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "",
    component: BodyComponent,
    children: [
      {
        path: "order",
        component: OrderUserComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
