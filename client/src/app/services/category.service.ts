import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  categoriesArr: any[] = [];

  public getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/categories`)
  }
}
