import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { getCart } from '@app/_store/actions/cart-actions';
import { getUserCart } from '@app/_store/selectors/cart-selector';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper | any;

  paymentForm = new FormGroup({
    cardNumber: new FormControl('', [
      Validators.required,
    ]),
    cardName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    expDate: new FormControl('', [
      Validators.required
    ]),
    cvv: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
    ]),
  });

  userCart$: Observable<any> | any;

  constructor(
    private store: Store
  ) {
     this.store.select(getUserCart).subscribe(res => {
       this.userCart$ = res;
    });
  }
  
  ngOnInit(): void {
  }

  goToNextStep() {
    this.myStepper.next();
  }

  payment() {
    if (this.paymentForm.valid) {
      this.goToNextStep();
      this.paymentForm.reset();
    }
    console.log(this.paymentForm.getRawValue());
  }

}
