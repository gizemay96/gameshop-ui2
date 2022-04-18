import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class NewsService {

     constructor(private http: HttpClient) { }

     getHeaders() {
          return {
               headers: {
                    "X-BingApis-SDK": "true",
                    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
                    "X-RapidAPI-Key": "912a126953msh7251363b2177f83p154b39jsne359b48c62f0",
               }
          };
     }

     // GET USER BASKET FROM DB
     getNews(count , offset) {
          const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=xbox%20playstation&count=${count}&offset=${offset}&setLang=EN&freshness=Month&originalImg=true&textFormat=Raw&safeSearch=Off`;
          const request = this.http.get(url, this.getHeaders());
          return request.pipe(map((res: any) => res || {}), catchError((err) => of(err)));
     }

}
