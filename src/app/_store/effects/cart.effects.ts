import { Injectable } from "@angular/core";
import { CartService } from "@app/services/cart.service";
import { CommonService } from "@app/services/common.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { getCart, getCartSuccess } from "../actions/cart-actions";

@Injectable()
export class cartEffects {
     constructor(
          private actions$: Actions,
          private cartService: CartService
     ) {
     }

     getCart$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(getCart),
               mergeMap((action) => {
                    return this.cartService.fetchUserBasket(action.id).pipe(map((data) => {
                         return getCartSuccess(data);
                    }));
               }))
     });

}