import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: { [key: string]: string } = {};
  languageChanged: Subject<string> = new Subject();


  constructor(private http: HttpClient,) { }

  setData(key: string, value: any) {
    this.data[key] = value;
  }

  getData(key: any) {
    return this.data[key];
  }

  getGameNews() {
    const currentLang = window.sessionStorage.getItem('currentLang');
    const request = this.http.get(`https://newsapi.org/v2/everything?q=games&language=${currentLang}&apiKey=d4f5d9fad28a495687f7461ec244c0d5`);
    return request.pipe(map((res: any) => res || []), catchError(() => of([])));
  }


  getProductCategories() {
    return [
      {
        categoryKey: 'all',
        translateKey: 'all-games',
        icon: 'fas fa-chess-queen',
        id: ''
      },
      {
        categoryKey: 'pcGames',
        translateKey: 'pc-games',
        icon: 'fas fa-desktop',
        id: '60d813c5489c90203cb76a52'
      },
      {
        categoryKey: 'playstationGames',
        translateKey: 'playstation',
        icon: 'fab fa-playstation',
        id: '6140f4318406572e08022cd4'
      },
      {
        categoryKey: 'xboxGames',
        translateKey: 'xbox',
        icon: 'fab fa-xbox',
        id: '6140f4698406572e08022cd7'
      },
      {
        categoryKey: 'nintendoGames',
        translateKey: 'nintendo',
        icon: 'fas fa-gamepad',
        id: '6140f48b8406572e08022cd9'
      },
    ];
  }

}
