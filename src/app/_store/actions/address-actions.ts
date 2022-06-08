import { addressResponseType } from "@app/types/address.type";
import { User } from "@app/types/user.type";
import { createAction, props } from "@ngrx/store";

export const getUserAddresses = createAction('Get User Addresses' , props<User>());
export const addressResponse = createAction('Get Address Response', props<addressResponseType>());