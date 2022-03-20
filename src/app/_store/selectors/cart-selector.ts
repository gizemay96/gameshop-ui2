
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getUserCart = createSelector(
  createFeatureSelector('getCartSuccess'),
  (state: any) => {
    return state;
  }
);