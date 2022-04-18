import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '@app/services/cart.service';
import { CommonService } from '@app/services/common.service';
import { Product } from '@app/types/product.type';
import { User } from '@app/types/user.type';
import { getCart } from '@app/_store/actions/cart-actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  rating: any;
  user: User;

  genres = ['Action', 'Shooter'];
  features = ['Multiplayer', 'Singleplayer', 'Co-Op', 'Controller Support'];

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store,
    private commonService: CommonService,
    private cartService: CartService,
    public translate: TranslateService
  ) {
    this.product = data.product;
    this.rating = this.product.rating;
    this.user = this.data.user;
  }

  ngOnInit(): void {
  }

  async addToCart(product: Product) {
    const params = {
      userId: this.user.id,
      productId: product._id,
      increaseOrDecrease: 1
    };
    const response = await lastValueFrom(this.cartService.updateBasket(params));
    if (response) {
      this.store.dispatch(getCart(this.user));
      this.commonService.openSuccessSnackBar('cart-updated');
    }
  }


  closeModal() {
    this.dialogRef.close();
  }

}
