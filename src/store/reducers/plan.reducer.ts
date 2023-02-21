import {
  getAllPlanAPIAction,
  getAllPlanAPISuccessAction,
  getAllPlanAPIErrorAction,
} from '../actions/plan.action';
import {createReducer} from '@reduxjs/toolkit';
import {Plans} from '../../types';

export type ConfigsState = {
  loading: boolean;
  error: any;
  plans: Plans | [];
};
const initialState: ConfigsState = {
  loading: false,
  error: null,
  plans: [],
};

/* Creating a reducer that will handle the actions that are dispatched. */
export const plansReducer = createReducer(initialState, builder => {
  return builder
    .addCase(getAllPlanAPIAction, state => {
      state.loading = true;
    })
    .addCase(getAllPlanAPISuccessAction, (state, action) => {
      state.loading = false;
      state.plans = action.payload;
    })
    .addCase(getAllPlanAPIErrorAction, (state, action) => {
      state.error = 'have error';
      state.loading = false;
    });
});
