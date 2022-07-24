import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ItemModel from '../models/item.module';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<ItemModel[]> {
    return this.http.get<ItemModel[]>(`${environment.serverUrl}/products`)
  }

  public addProducts(product: ItemModel): Observable<any> {
    return this.http.post(`${environment.serverUrl}/products`, product)
  }

  public updateProducts(product: ItemModel): Observable<any> {
    return this.http.put(`${environment.serverUrl}/products`, product)
  }

  public getPramsToLoginPage(): Observable<{ amountOfOrders: number, amountOfProduct: number }[]> {
    return this.http.get<{ amountOfOrders: number, amountOfProduct: number }[]>(`${environment.serverUrl}/users/params-to-Login-page`)
  }
}
