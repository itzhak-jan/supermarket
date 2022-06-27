import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(public stateService: StateService) { }

    // Parameters : 
    // request : Represents the request object which is on his way to the server
    // getting the request enables us to manipulate it.
    // next : Maybe we have multiple interceptors... so calling next sends the request
    // to the next interceptor (if exists)
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with our token if available
        let token: string | null
        let userName: string | null
        let status: string | null
        let cart: string | null

        token = sessionStorage.getItem("token");
        userName = sessionStorage.getItem("userName");
        status = sessionStorage.getItem("status");
        cart = sessionStorage.getItem("cart") as string;

        // Logically - token = null ---> false
        // token != null --> true
        // A situation for example : login (no token yet)
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            this.stateService.userName = userName;
            this.stateService.status = status;
        }

        return next.handle(request);
    }
}
