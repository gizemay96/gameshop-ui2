import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
     providedIn: 'root'
})
export class CommonService {



     constructor(private http: HttpClient,) { }


     getQuery(obj: any) {
          let str;
          str = [];
          for (const p in obj) {

               if (obj.hasOwnProperty(p) && obj[p]) {


                    if (typeof obj[p] === 'object') {

                         obj[p].forEach((item: string | number | boolean) => {
                              str.push(encodeURIComponent(p) + '=' + encodeURIComponent(item));
                         });

                    } else {
                         str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                    }

               }



          }
          return str.join('&');
     }

}
