import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonService } from './common.service';
import { environment as env } from '../../environments/environment';
import { getProductListRequestType, getProductsResponseType, Product } from '@app/types/product.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  getProductsWithPagination(params: getProductListRequestType) {
    const query = this.commonService.getQuery(params);
    const request = this.http.get<getProductsResponseType>(`${env.url}/products?${query}`);

    return request.pipe(map((res: getProductsResponseType) => {
      return res.payload;
    }), catchError(() => of({products:[] , totalCount: 0})));
  }
}
