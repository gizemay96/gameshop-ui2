import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, of } from "rxjs";
import { getUserAddresses } from "../actions/address-actions";
import { getCart } from "../actions/cart-actions";
import { autoLogin, autoLogout, registerUser } from "../actions/user-actions";
import { loginUser, authResponse } from "../actions/user-actions";

@Injectable()
export class userEffects {
     constructor(
          private actions$: Actions,
          private authService: AuthService,
          private store: Store,
          private router: Router
     ) { }

     loginUser$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(loginUser),
               mergeMap((action) => {
                    return this.authService.login({
                         email: action.email,
                         password: action.password
                    }).pipe(map((data) => {
                         if (!data.error) {
                              this.authService.setUserToLocalStorage(data)
                              this.store.dispatch(getCart(data.userDetail));
                              this.store.dispatch(getUserAddresses(data.userDetail));
                              return authResponse(data);
                         } else {
                              return authResponse(data);
                         }
                    }));
               }))
     });


     registerUser$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(registerUser),
               mergeMap((action) => {
                    return this.authService.register({ ...action }).pipe(map((data) => {
                         if (!data.error) {
                              this.authService.setUserToLocalStorage(data)
                              data.userDetail.id = data.userDetail._id;
                              this.store.dispatch(getCart(data.userDetail));
                              this.store.dispatch(getUserAddresses(data.userDetail));
                              return authResponse(data);
                         } else {
                              return authResponse(data);
                         }
                    }));
               }))
     });


     autoLogout$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(autoLogout),
               mergeMap((action) => {
                    this.authService.logout();
                    this.router.navigate(['home']);
                    return of(authResponse({}));
               })
          );
     });


     autoLogin$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(autoLogin),
               mergeMap((action) => {
                    const user = this.authService.getUserFromLocalStorage();
                    if (user) {
                         this.store.dispatch(getCart(user));
                         this.store.dispatch(getUserAddresses(user));
                    }
                    return of(authResponse(user));
               })
          );
     });




}