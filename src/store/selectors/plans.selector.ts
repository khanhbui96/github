import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

export const selectPlansState = (state: RootState) => state.plans;

export const selectPlans = createSelector(
  selectPlansState,
  state => state.plans,
);
