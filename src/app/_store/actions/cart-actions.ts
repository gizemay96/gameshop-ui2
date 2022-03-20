import { createAction, props } from "@ngrx/store";

export const getCart = createAction('Get Cart');
export const getCartSuccess = createAction('Get Cart Success', props<{ cartProducts: any}>());