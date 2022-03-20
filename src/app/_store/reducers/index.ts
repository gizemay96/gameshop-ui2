import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { getCartSuccessReducer } from './cart-reducers';
import { userReducer } from './user-reducer';


export interface State {
  getCartSuccess: any;
  authResponse: any;

}

export const reducers: ActionReducerMap<State> = {
  getCartSuccess: getCartSuccessReducer,
  authResponse: userReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
