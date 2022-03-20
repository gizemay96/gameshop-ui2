import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { getCartSuccessReducer } from './cart-reducers';


export interface State {
  getCartSuccess: any;

}

export const reducers: ActionReducerMap<State> = {
  getCartSuccess: getCartSuccessReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
