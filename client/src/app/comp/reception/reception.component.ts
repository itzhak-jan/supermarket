import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-reception',
  templateUrl: './reception.component.html',
  styleUrls: ['./reception.component.css']
})
export class ReceptionComponent implements OnInit {


  constructor(private router: Router, public stateService: StateService,
    public cartsService: CartService, public orderService: OrderService) { }

  ngOnInit(): void {
  }

  backToStore() {
    this.router.navigate(['/products'])
  }

  downloadReceipt() {
    let receipt = this.cartsService.reception
    const observable = this.orderService.DownloadReceipt(receipt)
    observable.subscribe(Response => {
      console.log(Response);
    },
      error => {
        alert('conected failed')
        console.error(error);

      }
    )
  }

}
