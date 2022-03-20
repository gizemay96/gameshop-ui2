import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '@app/components/product-detail/product-detail.component';
import { CartService } from '@app/services/cart.service';
import { DataService } from '@app/services/data.service';
import { ProductService } from '@app/services/product.service';
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
  user: User | any;
  loading = false;

  categories: any;
  products: any;

  page = 1;
  limit = 12;
  totalCount: any

  activeTab: any = '';


  constructor(
    private productService: ProductService,
    private dataService: DataService,
    public dialog: MatDialog,
    private cartService: CartService,
    private store: Store
  ) { 
    this.store.select(getAuthResponse).subscribe(res => {
      this.user = res;
    });
  }

  ngOnInit(): void {
    this.categories = this.dataService.getProductCategories();
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


  async getProducts(categoryId: any, type?: any) {
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


  openProductDetail(product: any) {
    const data = { panelClass: 'modal-lgc', data: product };
    const dialogRef = this.dialog.open(ProductDetailComponent, data);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async addToCart(product: any) {
    const params = {
      userId: this.user.id,
      productId: product._id,
      increaseOrDecrease: 1
    };
    const response = await lastValueFrom(this.cartService.updateBasket(params));
    if (response) {
      this.store.dispatch(getCart(this.user));
    }
  }



}
