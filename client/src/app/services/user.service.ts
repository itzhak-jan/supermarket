import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import UserLoginModel from '../models/user-login.module';
import UserRegisterModel from '../models/user-register.module';
import UserModel from '../models/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  public login(userLoginData: UserLoginModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.serverUrl}/users/login`, userLoginData)
  }

  public register(userRegisterData: UserRegisterModel): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/users`, userRegisterData)
  }
}