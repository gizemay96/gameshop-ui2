import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ConfirmationModalComponent } from '@app/components/confirmation-modal/confirmation-modal.component';
import { CartService } from '@app/services/cart.service';
import { CommonService } from '@app/services/common.service';
import { Address } from '@app/types/address.type';
import { Cart, CartProduct } from '@app/types/cart.type';
import { User } from '@app/types/user.type';
import { getCart } from '@app/_store/actions/cart-actions';
import { getAddressResponse } from '@app/_store/selectors/address-selector';
import { getUserCart } from '@app/_store/selectors/cart-selector';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

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

  selectedAddress: Address;

  isError = false;
  errorMessage = '';

  deliveryPrice = 0;
  progressProductId = '0';

  paymentForm = new FormGroup({});

  activeTab = 0;
  orderedItems = 0;

  loading = false;

  constructor(
    private store: Store,
    private cartService: CartService,
    public dialog: MatDialog,
    private translate: TranslateService,
    public commonService: CommonService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res.userDetail || res;
    });

    this.store.select(getUserCart).subscribe((res: Cart) => {
      this.userCart$ = res;
      this.deliveryPrice = !this.userCart$?.products?.length ? 0 : 12;
      this.progressProductId = '0';
    });

    this.store.select(getAddressResponse).subscribe((res: Address[]) => {
      this.userAddresses$ = res;
    });


    this.paymentForm = this.fb.group({
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

  }

  ngOnInit(): void {
  }

  goToNextStep(whichStep = '') {
    if (whichStep === 'payment' && !this.selectedAddress) {
      this.isError = true;
      this.errorMessage = this.translate.instant('error-message.select-delivery-address');
    } else {
      this.myStepper.next();
      this.activeTab = this.myStepper.selectedIndex;
      this.isError = false;
    }
  }

  async payment() {
    this.loading = true;
    if (this.paymentForm.valid) {
      const responseData = await lastValueFrom(this.cartService.resetCart(this.user.id));
      if (!responseData.error) {
        this.orderedItems = this.userCart$.products.length;
        this.store.dispatch(getCart(this.user));
        this.paymentForm.reset();
        this.selectedAddress = null;
        this.goToNextStep();
      }
    }
  }

  async addToCart(product: CartProduct) {
    this.progressProductId = product._id;
    const params = {
      userId: this.user.id,
      productId: product.product._id,
      increaseOrDecrease: 1
    };
    const response = await lastValueFrom(this.cartService.updateBasket(params));
    if (response && !response.error) {
      this.store.dispatch(getCart(this.user));
      this.commonService.openSuccessSnackBar('cart-updated');
    } else {
      this.progressProductId = '0';
    }
  }

  async deleteProduct(product: CartProduct) {
    this.progressProductId = product._id;
    const params = {
      userId: this.user.id,
      productId: product.product._id,
      increaseOrDecrease: -1
    };
    const response = await lastValueFrom(this.cartService.updateBasket(params));
    if (response && !response.error) {
      this.store.dispatch(getCart(this.user));
      this.commonService.openSuccessSnackBar('cart-updated');
    } else {
      this.progressProductId = '0';
    }
  }

  async resetCart() {
    const response = await lastValueFrom(this.cartService.resetCart(this.user.id));
    if (response.error) {
    } else {
      this.store.dispatch(getCart(this.user));
      this.commonService.openSuccessSnackBar('cart-updated');
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


  resetCartItems() {
    this.myStepper.reset();
    this.router.navigate(['home']);
  }

}
