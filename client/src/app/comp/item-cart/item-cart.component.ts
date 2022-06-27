import { Component, Input, OnInit } from '@angular/core';
import ItemCartModel from 'src/app/models/item-cart.module';
import { ItemCartService } from 'src/app/services/item-cart.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.css']
})
export class ItemCartComponent implements OnInit {

  constructor(public stateService: StateService, public productCartService: ItemCartService) { }
  @Input() productCart: ItemCartModel;

  isHover: boolean = false
  countToBy: number = 0


  ngOnInit(): void {
    this.countToBy = this.productCart.amount
  }

  over() {
    this.isHover = true
  }

  out() {
    this.isHover = false
  }


  lessCount() {
    this.countToBy = this.countToBy * 1 - 1;
    if (this.countToBy < 0) {
      this.countToBy = 0
    }
  }

  addCount() {
    this.countToBy = this.countToBy * 1 + 1
  }

  onSaveClicked() {
    let prodactCart: ItemCartModel = {
      id: this.productCart.id,
      name: this.productCart.name,
      price: this.productCart.price,
      img: this.productCart.img,
      amount: this.countToBy,
      productId: this.productCart.productId
    }

    let prodactCartToServer = {
      amount: this.countToBy,
      Id: prodactCart.id,
      productId: this.productCart.productId
    }

    const observable = this.productCartService.ChangeAmount(prodactCartToServer)
    observable.subscribe(Response => {

      let index = this.stateService.prodactsCart.findIndex((product) => product.id == this.productCart.id)
      if (this.countToBy == 0) {
        this.stateService.prodactsCart.splice(index, 1)
      }
      else {
        this.stateService.prodactsCart[index] = prodactCart
      }
      this.stateService.totalPrice = 0
      for (let i = 0; i < this.stateService.prodactsCart.length; i++) {
        this.stateService.totalPrice += (this.stateService.prodactsCart[i].price * this.stateService.prodactsCart[i].amount)
      }
    },
      error => {
        alert('conected failed')
        console.error(error);
      }
    )
  }
}
