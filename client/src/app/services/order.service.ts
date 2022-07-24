import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import ReceptionModel from '../models/reception.module';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/orders`)
  }

  public getFullDays(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/orders/full-days`)
  }

  public paymentForCart(order: { creditCard: string, dateToShipment: Date, adress: string }): Observable<ReceptionModel[]> {
    return this.http.post<ReceptionModel[]>(`${environment.serverUrl}/orders`, order)
  }

  public DownloadReceipt(receipt: any): Observable<any> {
    return this.http.post(`${environment.serverUrl}/orders/Download-receipt`, receipt)
  }
}
