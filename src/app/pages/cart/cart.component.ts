import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ConfirmationModalComponent } from '@app/components/confirmation-modal/confirmation-modal.component';
import { CartService } from '@app/services/cart.service';
import { Address } from '@app/types/address.type';
import { Cart, CartProduct } from '@app/types/cart.type';
import { User } from '@app/types/user.type';
import { getCart } from '@app/_store/actions/cart-actions';
import { getAddressResponse } from '@app/_store/selectors/address-selector';
import { getUserCart } from '@app/_store/selectors/cart-selector';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  user: User;
  userCart$: Cart;
  userAddresses$: Address[];
  deliveryPrice = 0;
  loadingProgressId = 0;

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

  selectedAddress: any;

  constructor(
    private store: Store,
    private cartService: CartService,
    public dialog: MatDialog,
    private translate: TranslateService
  ) {

    this.store.select(getAuthResponse).subscribe((res: User) => {
      this.user = res;
    });

    this.store.select(getUserCart).subscribe((res: Cart) => {
      this.userCart$ = res;
      this.deliveryPrice = !this.userCart$.products.length ? 0 : 12;
    });

    this.store.select(getAddressResponse).subscribe((res: Address[]) => {
      this.userAddresses$ = res;
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

  async addToCart(product: CartProduct) {
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

  async deleteProduct(product: CartProduct) {
    const params = {
      userId: this.user.id,
      productId: product.product._id,
      increaseOrDecrease: -1
    };
    const responseData = await this.cartService.updateBasket(params).toPromise();
    if (responseData.error) {
    } else {
      this.store.dispatch(getCart(this.user));
    }
  }

  async resetCart() {
    const params = {
      userId: this.user.id,
    };
    const response = await this.cartService.resetCart(params).toPromise();
    if (response.error) {
    } else {
      this.store.dispatch(getCart(this.user));
    }
  }

  confirmationModal(product?: CartProduct) {
    const message = product ? this.translate.instant('alert-messages.delete-product') : this.translate.instant('alert-messages.empty-card');
    const data = { panelClass: 'modal-smc', data: message };
    const dialogRef = this.dialog.open(ConfirmationModalComponent, data);
    dialogRef.afterClosed().subscribe(answer => {
      if (answer.isYes) {
        if (product) {
          this.deleteProduct(product);
        } else {
          this.resetCart();
        }
      }
    });
  }

}
