import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';
import { UserService } from 'src/app/services/user.service';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  totalPrice: number = 0;
  paramsToLoginPage: { amountOfOrders: number, amountOfProduct: number } = { amountOfOrders: 0, amountOfProduct: 0 }

  constructor(public stateService: StateService, private usersService: UserService,
    private router: Router, private cartService: CartService, public ItemsService: ItemsService) {

    this.LogOut()
    const observable = ItemsService.getPramsToLoginPage()
    observable.subscribe(Response => {
      this.paramsToLoginPage = Response[0]
    },
      error => {
        alert('you have any propblem whith the params')
        console.error(error);

      }
    )
  }

  ngOnInit(): void {
  }

  isPage01: boolean = true
  cartDate: Date

  onLoginClicked(): void {
    let user = {
      email: this.userName,
      password: this.password
    }
    const observable = this.usersService.login(user);

    observable.subscribe(Response => {

      sessionStorage.setItem("token", Response.token);
      sessionStorage.setItem("userName", Response.userName);
      sessionStorage.setItem("status", Response.userType);

      this.stateService.status = Response.userType;

      this.cartDate = Response.cartDate;
      if (Response.totalPrice) {
        this.totalPrice = Response.totalPrice;
        this.isPage01 = false;
      }
      else {
        this.router.navigate(['/products']);
      }

    },
      error => {
        alert('login failed')
        console.error(error);

      }
    )

  }

  onYesClicked() {
    this.router.navigate(['/products'])
  }

  onNoClicked() {

    const observable = this.cartService.cleanCart()
    observable.subscribe(Response => {
      alert(`your cart is empty now`)
      this.router.navigate(['/products'])
    },
      error => {
        alert('conected failed')
        console.error(error);
      }
    )
  }


  LogOut() {
    this.stateService.status = 'guest';
    this.stateService.userName = 'guest';
    this.stateService.search = '';
    this.stateService.prodactsCart = []
    this.stateService.totalPrice = 0
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

}
