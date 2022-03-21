import { createAction, props } from "@ngrx/store";

export const loginUser = createAction('Login User' , props<any>());
export const registerUser = createAction('Register User', props<any>());
export const editUser = createAction('Edit User', props<any>());


export const autoLogin = createAction('auto login');
export const autoLogout = createAction('auto logout');


export const authResponse = createAction('Get User Success', props<any>());
