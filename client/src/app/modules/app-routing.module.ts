import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "../comp/login/login.component";
import { MainComponent } from "../comp/main/main.component";
import { PaymentPageComponent } from "../comp/payment-page/payment-page.component";
import { ReceptionComponent } from "../comp/reception/reception.component";
import { RegisterComponent } from "../comp/register/register.component";
import { LoginGuard } from "../guards/login.guard";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', canActivate: [LoginGuard], component: MainComponent },
  { path: 'payment-page', canActivate: [LoginGuard], component: PaymentPageComponent },
  { path: 'reception', canActivate: [LoginGuard], component: ReceptionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
