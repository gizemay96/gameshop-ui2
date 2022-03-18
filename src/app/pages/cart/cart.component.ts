import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper | any;

  constructor() { }

  ngOnInit(): void {
  }

  goToNextStep(){
    this.myStepper.next();
  }

}
