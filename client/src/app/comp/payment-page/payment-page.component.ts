import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  constructor(private router: Router, public StateService: StateService,
    public CartService: CartService,  public OrderService: OrderService) { }
  city: string
  adress: String = ''
  dateToShipment: Date
  creditCard: Number
  errorMassege: string = ''
  ngOnInit(): void {
  }

  backToStore() {
    this.router.navigate(['/products'])
  }

  pay() {
    this.errorMassege = ''
    if (!this.city) {
      this.errorMassege = `city-Empty`
    }
    if (!this.adress) {
      this.errorMassege = `adress-Empty`
    }
    if (!this.dateToShipment) {
      this.errorMassege = `date-Empty`
    }
    if (!this.creditCard) {
      this.errorMassege = `credit-card-Empty`
    }
    if (this.creditCard.toString().length != 16) {
      this.errorMassege = `credit-card-incorrect`
    }
    if (this.errorMassege != '') {
      return
    }

    let order = {
      creditCard: this.creditCard.toString(),
      dateToShipment: this.dateToShipment,
      adress: this.city + " - " + this.adress
    }

    const observable = this.OrderService.paymentForCart(order)
    observable.subscribe(Response => {
      this.StateService.prodactsCart = [];
      this.StateService.totalPrice = 0;
      this.CartService.reception = Response
      this.router.navigate(['/reception'])
    },
      error => {
        alert('conected failed')
        console.error(error);
      }
    )
  }

}
