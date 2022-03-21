import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginForm: any) {
    const request = this.http.post(`${env.url}/users/signin`, loginForm);
    return request.pipe(map((response: any) => response.payload || {}), catchError((err) => of(err)));
  }

  register(registerData: any) {
    const request = this.http.post(`${env.url}/users/signup`, registerData);
    return request.pipe(map((response: any) => response.payload || {}), catchError((err) => of(err)));
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
  }

  setUserToLocalStorage(user: any) {
    window.sessionStorage.setItem('user', JSON.stringify(user.userDetail));
    window.sessionStorage.setItem('token', user.token);
  }

  getUserFromLocalStorage() {
    const user = window.sessionStorage.getItem('user');
    if (user) {
      if (!user) { return; }
      return JSON.parse(user);
    }
  }

  isAuthenticated(): boolean {
    return !!window.sessionStorage.getItem('token');
  }
}
