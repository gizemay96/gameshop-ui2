import { createAction, props } from "@ngrx/store";

export const getCart = createAction('Get Cart' , props<any>());
export const getCartSuccess = createAction('Get Cart Success', props<any>());