import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '@app/components/product-detail/product-detail.component';
import { CartService } from '@app/services/cart.service';
import { CommonService } from '@app/services/common.service';
import { ProductService } from '@app/services/product.service';
import { Product } from '@app/types/product.type';
import { User } from '@app/types/user.type';
import { getCart } from '@app/_store/actions/cart-actions';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;
  categories: any;
  products: Product[];

  loading = false;
  page = 1;
  limit = 12;
  totalCount: number;
  activeTab: string = '';


  constructor(
    private productService: ProductService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private cartService: CartService,
    private store: Store
  ) {
    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res.userDetail || res;
    });
  }

  ngOnInit(): void {
    this.categories = this.commonService.getProductCategories();
    this.getPage();
  }

  async getPage(categoryId = '', page = this.page, limit = this.limit) {
    this.loading = true;
    let params = { page, categoryId, limit };
    const response = await lastValueFrom(this.productService.getProductsWithPagination(params));
    this.products = response.products;
    this.totalCount = response.totalCount;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  // Pagination Actions
  async getProducts(categoryId: string, type?: string) {
    const disabledPrevioustButton = (type === 'previousPage' && this.page === 1);
    const disabledNextButton = type === 'nextPage' && (this.limit * this.page > this.totalCount)

    if (disabledPrevioustButton || disabledNextButton) { return; }
    else {
      if (type) {
        this.page = type === 'nextPage' ? this.page + 1 : this.page - 1;
      }
      this.getPage(categoryId);
    }
  }


  openProductDetail(product: Product) {
    const data = { panelClass: 'modal-lgc', data: { product, user: this.user } };
    this.dialog.open(ProductDetailComponent, data);
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
      this.commonService.openSuccessSnackBar();
    }
  }



}
