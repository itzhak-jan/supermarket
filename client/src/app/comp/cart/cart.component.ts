import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ItemCartModel from 'src/app/models/item-cart.module';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, public stateService: StateService, public cartsService: CartService) {

    this.stateService.prodactsCart = [];
    this.stateService.totalPrice = 0;

    const observable = cartsService.getMyCart()
    observable.subscribe(Response => {
      this.prodactsCartFromServer(Response)
    },
      error => {
        alert('conected failed')
        console.error(error);

      }
    )
  }


  prodactsCartFromServer(Response: ItemCartModel[]) {
    for (let i = 0; i < Response.length; i++) {
      this.stateService.prodactsCart.push(Response[i]);
      this.stateService.totalPrice += (this.stateService.prodactsCart[i].price * this.stateService.prodactsCart[i].amount)
    }

  }

  paymentForCart() {
    this.router.navigate(['/payment-page'])
  }


  ngOnInit(): void {
  }


}
