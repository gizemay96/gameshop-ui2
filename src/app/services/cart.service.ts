import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { cartResponseType, updateCartRequestType } from '@app/types/cart.type';

@Injectable({
  providedIn: 'root',
})


export class CartService {


  constructor(private http: HttpClient, private commonService: CommonService, private authService: AuthService) { }

  // GET USER BASKET FROM DB
  fetchUserBasket(userId: string) {
    const request = this.http.get(`${env.url}/carts/${userId}`);
    return request.pipe(map((res: cartResponseType) => res.payload || {}), catchError((err) => of(err)));
  }

  // UPDATE BASKET ITEMS
  updateBasket(params: updateCartRequestType) {
    const request = this.http.post(`${env.url}/carts`, params);
    return request.pipe(map((res: cartResponseType) => res), catchError((err) => of(err)));
  }

  // DELETE ALL PRODUCTS
  resetCart(userId: string, productId = null) {
    const params = { userId, productId };
    const query = this.commonService.getQuery(params);
    const request = this.http.delete(`${env.url}/carts?${query}`);
    return request.pipe(map((res: cartResponseType) => res), catchError((err) => of(err)));
  }
}
