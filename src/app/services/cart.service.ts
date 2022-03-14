import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})


export class CartService {
  public progressActive: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient , private commonService: CommonService) {

  }

  // GET USER BASKET FROM DB
  fetchUserBasket(userId: any) {
    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `${token}` },
    };
    const request = this.http.get(`${env.url}/carts/${userId}`, httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }

  // UPDATE BASKET ITEMS
   updateBasket(params: any) {

    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `${token}` },
    };

    const request = this.http.post(`${env.url}/carts`, params, httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }

  deleteProductFromCart(params: any) {

    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `${token}` },
    };
    const query = this.commonService.getQuery(params);

    const request = this.http.delete(`${env.url}/carts?${query}`, httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }

  // DELETE ALL PRODUCTS
  resetCart(params: any) {
    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `${token}` },
    };
    const query = this.commonService.getQuery(params);
    const request = this.http.delete(`${env.url}/carts?${query}`, httpOptions);
    return request.pipe(map((res: any) => res.payload || {}), catchError((err) => of(err)));
  }
}
