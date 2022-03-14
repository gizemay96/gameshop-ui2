import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../types/user.type';
import { environment as env } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | any;
  errors : any;

  token = window.sessionStorage.getItem('token');
  httpOptions = {
    headers: { Authorization: `${this.token}` },
  };

  constructor(
    private http: HttpClient,
  ) { }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  tryToLogin() {
    const user = window.sessionStorage.getItem('user');
    if (!user) { return; }

    this.user = JSON.parse(user);
    this.getDetails();

  }

  async getDetails() {
    if (this.user.avatar) {
      this.user.avatarUrl = `${env.url}${this.user.avatar.url}`;
    } else {
      this.user.avatarUrl = 'assets/images/avatar-placeholder.jpg';
    }
  }

  editUser(editedForm: any) {
    const requestData = { id: this.user.id, ...editedForm };
    const request = this.http.put(`${env.url}/users`, requestData, this.httpOptions);
    return request.pipe(map((res: any) => res.payload || []), catchError((err) => of(err)));
  }

  getServerErrors() {
    return this.errors;
  }
}
