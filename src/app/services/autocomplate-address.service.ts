import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutocomplateAddressService {
  constructor(private http: HttpClient) {}
  token;

  getToken() {
    const httpOptions = {
      headers: {
        Accept: 'application/json',
        'api-token':
          'lVBXV4cJFgnJJSsTO_4Jzt8hlwVeZJjKtBlHw37LXdojYhJgcYr246IZE6rsuEuptRU',
        'user-email': 'secrettumm@gmail.com',
      },
    };

    return this.http
      .get(`https://www.universal-tutorial.com/api/getaccesstoken`, httpOptions)
      .subscribe((response: any) => (this.token = response.auth_token));
  }

  getCountries() {
    const httpOptions = {
      headers: { Authorization: `Bearer ${this.token}` },
    };
    return this.http.get(
      `https://www.universal-tutorial.com/api/countries/`,
      httpOptions
    );
  }

  getCities(country) {
    const httpOptions = {
      headers: { Authorization: `Bearer ${this.token}` },
    };
    return this.http.get(
      `https://www.universal-tutorial.com/api/states/${country}`,
      httpOptions
    );
  }
}
