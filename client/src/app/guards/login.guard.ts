import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { StateService } from '../services/state.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  private status: string;
  private userName: string;

  public constructor(private router: Router , public stateService: StateService) {
    // let helper = new JwtHelperService();
    const token = sessionStorage.getItem("token");
    const userName = sessionStorage.getItem("userName");
    const status = sessionStorage.getItem("status");


    if (token) {
      // let decoded = helper.decodeToken(token);
      this.userName = userName
      this.status = status
      this.stateService.userName = userName;
      this.stateService.status = status;      
    }
  }


  public canActivate(): boolean {
    if (this.status) {
      return true
    }
    this.router.navigate(['/'])
    return false
  }

}
