import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
