import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { addressReducer } from './address-reducers';
import { getCartSuccessReducer } from './cart-reducers';
import { userReducer } from './user-reducer';


export interface State {
  getCartSuccess: any;
  authResponse: any;
  getAddressResponse: any;

}

export const reducers: ActionReducerMap<State> = {
  getCartSuccess: getCartSuccessReducer,
  authResponse: userReducer,
  getAddressResponse: addressReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
