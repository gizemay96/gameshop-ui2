import { createReducer, on } from '@ngrx/store';
import { getCartSuccess } from '../actions/cart-actions';


export const intialCartEntries = {};

const getCartSuccessObj = createReducer(intialCartEntries,
     on(getCartSuccess, (state, action) => {
          return action;
     }),
);

export function getCartSuccessReducer(state: any, action: any) {
     return getCartSuccessObj(state, action);
}