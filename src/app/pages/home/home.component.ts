import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '@app/components/login-modal/login-modal.component';
import { RegisterModalComponent } from '@app/components/register-modal/register-modal.component';
import { CartService } from '@app/services/cart.service';
import { DataService } from '@app/services/data.service';
import { ProductService } from '@app/services/product.service';
import { UserService } from '@app/services/user.service';
import { User } from '@app/types/user.type';

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

  activeTab = 0;


  constructor(
    private userService: UserService,
    private productService: ProductService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.categories = this.dataService.getProductCategories();
    this.getPage();
  }

  async getPage(categoryId = '', page = this.page, limit = this.limit) {
    let params = { page, categoryId, limit };
    const response = await this.productService.getProductsWithPagination(params).toPromise();
    this.products = response.products;
    this.totalCount = response.totalCount;
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



}
