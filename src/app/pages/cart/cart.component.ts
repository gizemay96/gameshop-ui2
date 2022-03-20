import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CartService } from '@app/services/cart.service';
import { getCart } from '@app/_store/actions/cart-actions';
import { getUserCart } from '@app/_store/selectors/cart-selector';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';
import { lastValueFrom, Observable } from 'rxjs';

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
  user: any;

  constructor(
    private store: Store,
    private cartService: CartService
  ) {

    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res;
    });

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
  }

  async addToCart(product: any) {
    const params = {
      userId: this.user.id,
      productId: product.product._id,
      increaseOrDecrease: 1
    };
    const response = await lastValueFrom(this.cartService.updateBasket(params));
    if (response) {
      this.store.dispatch(getCart(this.user));
    }
  }

}
