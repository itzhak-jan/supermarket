import { Component, Input, OnInit } from '@angular/core';
import ItemCartModel from 'src/app/models/item-cart.module';
import ItemModel from 'src/app/models/item.module';
import { ItemCartService } from 'src/app/services/item-cart.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(public stateService: StateService, public productCartService: ItemCartService) { }
  searchWord: string = this.stateService.search
  @Input() product: ItemModel;
  countToBy: number = 0
  isHover: boolean = false

  ngOnInit(): void {
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

  searchCategory() {
    if (this.stateService.search) {
      this.stateService.search = ''
    }
    else {
      this.stateService.search = this.product.category
    }
  }

  editProduct() {
    this.stateService.editProduct = this.product
  }

  over() {
    this.isHover = true
  }

  out() {
    this.isHover = false
  }

  onAddCliced() {
    let prodactCart: ItemCartModel = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      img: this.product.img,
      amount: this.countToBy,
      productId: this.product.id
    }

    let prodactCartToServer = {
      amount: this.countToBy,
      Id: prodactCart.id,
      productId: this.product.id
    }

    const observable = this.productCartService.addToMyCarts(prodactCartToServer)
    observable.subscribe(Response => {
      let index = this.stateService.prodactsCart.findIndex((product) => product.productId == prodactCart.id)

      if (index == -1) {
        this.stateService.prodactsCart.push(prodactCart);
      }
      else {
        if (this.countToBy == 0) {
          this.stateService.prodactsCart.splice(index, 1)
        }
        else {
          this.stateService.prodactsCart[index] = prodactCart
        }
      }
      // Update of the overall price of the stroller
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
