import { createReducer, on } from '@ngrx/store';
import { addressResponse } from '../actions/address-actions';


export const initialAddressEntries = [];

const addressResponseObj = createReducer(initialAddressEntries,
     on(addressResponse, (state, action) => {
          return action.payload;
     }),
);

export function addressReducer(state: any, action: any) {
     return addressResponseObj(state, action);
}