import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public stateService: StateService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogOutClicked() {
    this.stateService.status = 'guest';
    this.stateService.userName = 'guest';
    this.stateService.search = '';
    this.stateService.prodactsCart = []
    this.stateService.totalPrice = 0
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  onRegisterClicked() {
    this.router.navigate(['/register'])
  }
  onLoginClicked() {
    this.router.navigate(['/login'])
  }

}
