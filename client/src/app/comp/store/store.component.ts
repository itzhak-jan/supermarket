import { Component, OnInit } from '@angular/core';
import ItemModel from 'src/app/models/item.module';
import { CategoryService } from 'src/app/services/category.service';
import { ItemsService } from 'src/app/services/items.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(public stateService: StateService, private ItemsService: ItemsService, public categories: CategoryService) {
    this.getAllProducts()
    this.getAllCategories()
  }

  searchWord: string = this.stateService.search
  productsArray: ItemModel[] = []

  ngOnInit(): void {
  }

  searchCategory(category: string) {
    this.stateService.search = category
  }

  getAllProducts() {
    const observable = this.ItemsService.getAllProducts()
    observable.subscribe(Response => {
      this.productsArray = Response
    },
      error => {
        alert('conected failed')
        console.error(error);

      }
    )
  }

  getAllCategories() {
    const observable = this.categories.getAllCategories()
    observable.subscribe(Response => {
      this.categories.categoriesArr = Response
    },
      error => {
        alert('conected failed')
        console.error(error);

      }
    )
  }
}
