import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router) { }

  register(registerData: any) {
    const request = this.http.post(`${env.url}/users/signup`, registerData);
    return request.pipe(map((response: any) => response.payload || {}), catchError((err) => of(err)));
  }

  logout() {
    window.sessionStorage.removeItem('token');
    window.sessionStorage.removeItem('user');
    this.userService.setUser({
      id: 0,
      _id: 0,
      username: '',
      firstName: '',
      lastName: '',
      email: ''
    });
    this.router.navigateByUrl('/');
  }

  setToken(token: string) {
    window.sessionStorage.setItem('token', token);
  }

  login(loginForm: any) {
    const request = this.http.post(`${env.url}/users/signin`, loginForm);
    return request.pipe(map((response: any) => response.payload || {}), catchError((err) => of(err)));
  }

  isAuthenticated(): boolean {
    return !!window.sessionStorage.getItem('token');
  }
}
