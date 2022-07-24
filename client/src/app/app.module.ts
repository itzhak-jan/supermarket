import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './comp/header/header.component';
import { SearchComponent } from './comp/search/search.component';
import { MenuComponent } from './comp/menu/menu.component';
import { LoginComponent } from './comp/login/login.component';
import { RegisterComponent } from './comp/register/register.component';
import { MainComponent } from './comp/main/main.component';
import { StoreComponent } from './comp/store/store.component';
import { ItemComponent } from './comp/item/item.component';
import { CartComponent } from './comp/cart/cart.component';
import { ItemCartComponent } from './comp/item-cart/item-cart.component';
import { AdminPageComponent } from './comp/admin-page/admin-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { PaymentPageComponent } from './comp/payment-page/payment-page.component';
import { ReceptionComponent } from './comp/reception/reception.component';
import { FormsModule } from '@angular/forms';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    StoreComponent,
    ItemComponent,
    CartComponent,
    ItemCartComponent,
    AdminPageComponent,
    PaymentPageComponent,
    ReceptionComponent,
    OnlyNumbersDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthenticationInterceptor, 
      multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
