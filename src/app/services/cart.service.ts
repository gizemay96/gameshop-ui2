import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})


export class CartService {
  token = window.sessionStorage.getItem('token');
  httpOptions = {
    headers: { Authorization: `${this.token}` },
  };

  constructor(private http: HttpClient, private commonService: CommonService) { }

  // GET USER BASKET FROM DB
  fetchUserBasket(userId: any) {
    const request = this.http.get(`${env.url}/carts/${userId}`, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }

  // UPDATE BASKET ITEMS
  updateBasket(params: any) {
    const request = this.http.post(`${env.url}/carts`, params, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }

  // DELETE ALL PRODUCTS
  resetCart(params: any) {
    const query = this.commonService.getQuery(params);
    const request = this.http.delete(`${env.url}/carts?${query}`, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }
}
