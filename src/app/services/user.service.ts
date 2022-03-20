import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getCart } from '@app/_store/actions/cart-actions';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  errors : any;

  token = window.sessionStorage.getItem('token');
  httpOptions = {
    headers: { Authorization: `${this.token}` },
  };

  constructor(
    private http: HttpClient
  ) { }


  editUser(userId: any , editedForm: any) {
    const requestData = { id: userId, ...editedForm };
    const request = this.http.put(`${env.url}/users`, requestData, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || []), catchError((err) => of(err)));
  }

}
