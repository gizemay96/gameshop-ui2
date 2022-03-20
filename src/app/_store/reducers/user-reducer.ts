import { createReducer, on } from '@ngrx/store';
import { authResponse } from '../actions/user-actions';


export const initialUserEntries = {};

const authResponseObj = createReducer(initialUserEntries,
     on(authResponse, (state, action) => {
          return action;
     }),
);

export function userReducer(state: any, action: any) {
     return authResponseObj(state, action);
}