import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '@app/components/product-detail/product-detail.component';
import { CartService } from '@app/services/cart.service';
import { CommonService } from '@app/services/common.service';
import { NewsService } from '@app/services/news.service';
import { ProductService } from '@app/services/product.service';
import { Product } from '@app/types/product.type';
import { User } from '@app/types/user.type';
import { getCart } from '@app/_store/actions/cart-actions';
import { getAuthResponse } from '@app/_store/selectors/user-selector';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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

  news: Array<[]> = [];
  newsOffset: number = 0;
  newsTotalCount: number = 0;

  loading: boolean = false;
  loadMoreProgress: boolean = false;

  totalCount: number;
  activeTab: string = '';
  progressProductId = '0';

  page: number = 1;
  limit: number = 12;


  constructor(
    private productService: ProductService,
    private commonService: CommonService,
    public dialog: MatDialog,
    private cartService: CartService,
    private store: Store,
    private newsService: NewsService,
    private translate: TranslateService,
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
    this.loading = !this.loadMoreProgress ? true : false;

    if (categoryId !== 'news') {
      let params = { page, categoryId, limit };
      // Get Product Data from service
      const response = await lastValueFrom(this.productService.getProductsWithPagination(params));
      if (response) {
        // if is not init action, merge products data
        this.products = this.products?.length > 0 ? this.products.concat(response.products) : response.products;
        this.totalCount = response.totalCount;
        this.progressProductId = '0';
      }
    } else { this.newsActions(); }

    setTimeout(() => {
      this.loading = false;
      this.loadMoreProgress = false;
    }, 500);
  }

  async newsActions() {
    // Get News Data from service
    const data = await lastValueFrom(this.newsService.getNews(this.newsOffset + 8, this.newsOffset));
    const formattedResponse = data.value.reduce((arr, item) => { arr.push(this.formatNewsData(item)); return arr; }, []);
    this.news = this.news.length > 0 ? this.news.concat(formattedResponse) : formattedResponse;
    this.newsOffset = this.newsOffset + 8;
    this.newsTotalCount = data.totalEstimatedMatches;

    setTimeout(() => {
      this.loading = false;
      this.loadMoreProgress = false;
    }, 500);
  }

  loadMore() {
    const noMoreProduct = this.limit * this.page > this.totalCount;
    if (!this.loadMoreProgress && (!noMoreProduct && this.products?.length > 0) || this.newsTotalCount > this.news.length) {
      this.loadMoreProgress = true;
      setTimeout(() => { this.page++; this.getPage(this.activeTab); }, 1100);
    } else {
      this.loadMoreProgress = false;
    }
  }

  changeTab(categoryId) {
    this.products = [];
    this.page = 1;
    this.activeTab = categoryId;
    this.getPage(this.activeTab);
  }


  openProductDetail(product: Product) {
    const data = { panelClass: 'modal-lgc', data: { product, user: this.user } };
    this.dialog.open(ProductDetailComponent, data);
  }

  async addToCart(product: Product) {
    this.progressProductId = product._id;
    const params = {
      userId: this.user.id,
      productId: product._id,
      increaseOrDecrease: 1
    };
    const response = await lastValueFrom(this.cartService.updateBasket(params));
    if (response && !response.error) {
      this.store.dispatch(getCart(this.user));
      this.commonService.openSuccessSnackBar('cart-updated');
      this.progressProductId = '0';
    }
  }

  formatNewsData(item) {
    return {
      _id: 0,
      categoryId: 'news',
      description: item.description,
      image: item.image?.contentUrl || '../../../assets/img/default_news.jpg',
      imageLogo: item.provider[0].image?.thumbnail?.contentUrl,
      price: 0,
      rating: 5,
      title: item.name,
      url: item.url
    };
  }

  get tooltipMessage() {
    return this.translate.instant('alert-messages.please-login');
  }


}
