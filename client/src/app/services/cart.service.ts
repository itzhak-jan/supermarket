import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import ItemCartModel from '../models/item-cart.module';
import ReceptionModel from '../models/reception.module';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  reception: ReceptionModel[] = []

  public getMyCart(): Observable<ItemCartModel[]> {
    return this.http.get<ItemCartModel[]>('http://localhost:3001/carts')
  }

  public cleanCart(): Observable<any> {
    let any = null
    return this.http.put<any>('http://localhost:3001/carts', any)
  }

}
