import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
     providedIn: 'root'
})
export class CommonService {

     constructor(private _snackBar: MatSnackBar , private translate: TranslateService) { }

     openSuccessSnackBar(messageKey = "") {
         const message = this.translate.instant(`success-messages.${messageKey}`);

          this._snackBar.open(`${message}  🥳`, 'Ok', {
               horizontalPosition: 'right',
               verticalPosition: 'top',
               panelClass: 'snackbar-style',
               duration: 1100
          });
     }

     errorSnackBar(errorMessage = "") {

           this._snackBar.open(`${errorMessage}  😢`, 'Ok', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                panelClass: 'error-snackbar',
                duration: 9000
           });
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
               {
                    categoryKey: 'gameNews',
                    translateKey: 'game-news',
                    icon: 'fas fa-gamepad',
                    id: 'news'
               },
          ];
     }


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
