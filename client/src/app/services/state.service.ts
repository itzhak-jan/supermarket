import { Injectable } from '@angular/core';
import ItemCartModel from '../models/item-cart.module';
import ItemModel from '../models/item.module';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  
  public search: string = '';
  public userName: string = 'guest';
  public  status: string = 'guest';
  public totalPrice:number = 0;

  public prodactsCart: ItemCartModel[] = [];
  public editProduct: ItemModel

  constructor() { }

}
