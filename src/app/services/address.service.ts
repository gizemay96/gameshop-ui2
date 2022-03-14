import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Address } from '../types/address.type';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  userAddresses: Address[] = [];

  token = window.sessionStorage.getItem('token');
  httpOptions = {
    headers: { Authorization: `${this.token}` },
  };

  constructor(private http: HttpClient, private userService: UserService) { }

  fetchUserAddress() {
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    const token = window.sessionStorage.getItem('token');
    const httpOptions = {
      headers: { Authorization: `${token}` },
    };

    const request = this.http.get(`${env.addressApiURL}/${userId}`, httpOptions);
    return request.pipe(map((res: any) => res.payload || []), catchError(() => of([])));
  }

  addUserAddress(address: Address) {
    const NewAddress = {
      userId: this.userService.getUser().id,
      ...address,
    };

    const request = this.http.post(`${env.addressApiURL}`, NewAddress, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || null), catchError((err) => of(err)));
  }

  editUserAddress(address: Address) {
    const request = this.http.put(`${env.addressApiURL}`, address, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || null), catchError((err) => of(err)));
  }

  deleteAddress(addressId: number) {
    const request = this.http.delete(`${env.addressApiURL}/${addressId}`, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || null), catchError((err) => of(err)));
  }

}
