import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonService } from './common.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  getProductsWithPagination(params: any) {
    delete params.items;
    const query = this.commonService.getQuery(params);
    const request = this.http.get<any[]>(`${env.url}/products?${query}`);

    return request.pipe(map((res: any) => {
      return res.payload || [];
    }), catchError(() => of([])));
  }

  // getAllProducts(params: { items: any; }) {
  //   delete params.items;
  //   const query = this.commonService.getQuery(params);
  //   const request = this.http.get<any[]>(`${env.url}/products?${query}`);
  //   return request.pipe(map((res: any) => res.payload.products || []), catchError(() => of([])));
  // }
}
