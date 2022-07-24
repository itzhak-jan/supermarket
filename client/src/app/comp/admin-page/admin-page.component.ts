import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ItemModel from 'src/app/models/item.module';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';
import { OrderService } from 'src/app/services/order.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private router: Router, private orderService: OrderService,
    public stateService: StateService, private ItemsService: ItemsService, public categories: CategoryService) {

    const observable = this.orderService.getAllOrders()
    observable.subscribe(Response => {
      this.ordersArr = Response
    },
      error => {
        alert('conected failed')
        console.error(error);
      }
    )
  }

  ordersArr: any[]

  imgUrl: string;
  name: string;
  price: number;
  categoryID: number;
  AddNewProductHTML: boolean = false

  errorMassege: string = '';
  ngOnInit(): void {
  }

  save() {
    if (!this.imgUrl) {
      this.imgUrl = this.stateService.editProduct.img
    }
    if (!this.name) {
      this.name = this.stateService.editProduct.name
    }
    if (!this.price) {
      this.price = this.stateService.editProduct.price
    }
    if (this.price < 0) {
      alert('Price must be positive')
      this.price = this.stateService.editProduct.price
    }
    if (!this.categoryID) {
      this.categoryID = this.stateService.editProduct.categoryID
    }

    let editProduct = this.stateService.editProduct
    editProduct.img = this.imgUrl
    editProduct.name = this.name
    editProduct.price = this.price
    editProduct.categoryID = this.categoryID

    const observable = this.ItemsService.updateProducts(editProduct)
    observable.subscribe(Response => {
      console.log(editProduct);
    },
      error => {
        alert('conected failed')
        console.error(error);
      }
    )

  }

  cancel() {
    this.stateService.editProduct = null
    this.errorMassege = ''
  }

  onAddNewProductHTML() {
    this.AddNewProductHTML = !this.AddNewProductHTML
    if(this.stateService.editProduct != null){
      this.stateService.editProduct = null
      this.imgUrl = ""
      this.name = ""
      this.price = 0
      this.categoryID = null
      this.AddNewProductHTML = true
    }

  }
  cancelAdd() {
    this.AddNewProductHTML = false
    this.errorMassege = ''
  }

  addProduct() {
    this.errorMassege = ''
    if (!this.imgUrl) {
      this.errorMassege += 'imgUrl-empty'
    }
    if (!this.name) {
      this.errorMassege += 'name-empty'
    }
    if (!this.price) {
      this.errorMassege += 'price-empty'
    }
    if (this.price < 0) {
      this.errorMassege += 'Price must be positive'
    }
    if (!this.categoryID) {
      this.errorMassege += 'category-empty'
    }
    if (this.errorMassege != '') {
      return
    }
    let addProduct: ItemModel = {
      name: this.name,
      price: this.price,
      categoryID: this.categoryID,
      img: this.imgUrl,
      id: 0
    }
    const observable = this.ItemsService.addProducts(addProduct)
    observable.subscribe(Response => {
      console.log(addProduct);
    },
      error => {
        alert('conected failed')
        console.error(error);
      }
    )
  }
}
