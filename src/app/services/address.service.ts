import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Address } from '../types/address.type';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  userAddresses: Address[] = [];

  constructor(private http: HttpClient) { }

  getToken() {
    let token = window.sessionStorage.getItem('token');
    return {
      headers: { Authorization: `${token}` },
    };
  }

  getUserAddress(userId: string) {
    const request = this.http.get(`${env.url}/users/userAddresses/${userId}`, this.getToken());
    return request.pipe(map((res: any) => res || []), catchError(() => of([])));
  }

  addUserAddress(address: Address) {
    const request = this.http.post(`${env.url}/users/userAddresses`, address, this.getToken());
    return request.pipe(map((res: any) => res.payload || null), catchError((err) => of(err)));
  }

  editUserAddress(address: Address) {
    const request = this.http.put(`${env.url}/users/userAddresses`, address, this.getToken());
    return request.pipe(map((res: any) => res.payload || null), catchError((err) => of(err)));
  }

  deleteAddress(addressId: string) {
    const request = this.http.delete(`${env.url}/users/userAddresses/${addressId}`, this.getToken());
    return request.pipe(map((res: any) => res.payload || null), catchError((err) => of(err)));
  }

}
