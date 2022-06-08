import { Injectable } from "@angular/core";
import { AddressService } from "@app/services/address.service";
import { addressResponseType } from "@app/types/address.type";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { addressResponse, getUserAddresses } from "../actions/address-actions";

@Injectable()
export class addressEffects {
     constructor(
          private actions$: Actions,
          private addressService: AddressService
     ) { }

     getUserAddresses$ = createEffect(() => {
          return this.actions$.pipe(
               ofType(getUserAddresses),
               mergeMap((action) => {
                    return this.addressService.getUserAddress(action.id).pipe(map((data: addressResponseType) => {
                         return addressResponse(data);
                    }));
               }))
     });

}