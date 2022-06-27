import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public stateService: StateService) { }
  isAdmin: boolean = false

  ngOnInit(): void {
    console.log(this.stateService.status);

    if (this.stateService.status == 'admin') {
      this.isAdmin = true
      console.log(this.isAdmin);

    }
  }
}
