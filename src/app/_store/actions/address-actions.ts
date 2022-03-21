import { createAction, props } from "@ngrx/store";

export const getUserAddresses = createAction('Get User Addresses' , props<any>());
export const addressResponse = createAction('Get Address Response', props<any>());