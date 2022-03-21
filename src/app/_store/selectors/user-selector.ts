
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getAuthResponse = createSelector(
  createFeatureSelector('authResponse'),
  (state: any) => {
    return state;
  }
);