import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ItemToServerModel from '../models/item-to-server.module';

@Injectable({
  providedIn: 'root'
})
export class ItemCartService {

  constructor(private http: HttpClient) { }

  public addToMyCarts(productData: ItemToServerModel): Observable<any> {
    return this.http.post(`${environment.serverUrl}/productCart`, productData)
  }

  public ChangeAmount(productData: ItemToServerModel): Observable<any> {
    return this.http.put(`${environment.serverUrl}/productCart`, productData)
  }

  public deleteFromMyCart(productId: number): Observable<any> {
    return this.http.delete(`${environment.serverUrl}/productCart` + productId)
  }
}
