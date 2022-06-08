import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, mergeMap, of } from "rxjs";
// Actions
import { getUserAddresses } from "../actions/address-actions";
import { getCart } from "../actions/cart-actions";
import { autoLogin, autoLogout, registerUser } from "../actions/user-actions";
import { loginUser, authResponse } from "../actions/user-actions";
// Response Types
import { authResponsePayload } from "@app/types/authResponse.type";
import { User } from "@app/types/user.type";
import { loginForm, registerForm } from "@app/types/forms.type";

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
               mergeMap((action: loginForm) => {
                    return this.authService.login({
                         email: action.email,
                         password: action.password
                    }).pipe(map((data: authResponsePayload) => {
                         if (data) {
                              this.authService.setUserToLocalStorage(data)
                              this.getUserDetail(data.userDetail);
                         }
                         return authResponse(data);
                    }));
               }))
     });


     registerUser$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(registerUser),
               mergeMap((action: registerForm) => {
                    return this.authService.register({ ...action }).pipe(map((data: authResponsePayload) => {
                         if (data) {
                              data.userDetail.id = data.userDetail._id;
                              this.authService.setUserToLocalStorage(data)
                              this.getUserDetail(data.userDetail);
                         }
                         return authResponse(data);
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
                         this.getUserDetail(user);
                    }
                    return of(authResponse(user));
               })
          );
     });


     getUserDetail(user: User) {
          setTimeout(() => {
               this.store.dispatch(getCart(user));
               this.store.dispatch(getUserAddresses(user));
          }, 200);
     }



}