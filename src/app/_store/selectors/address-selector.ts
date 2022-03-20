
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAddressResponse = createSelector(
  createFeatureSelector('getAddressResponse'),
  (state: any) => {
    return state;
  }
);