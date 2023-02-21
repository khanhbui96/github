import {createReducer} from '@reduxjs/toolkit';
import {Configs, Config} from '../../../types';
import {
  getAllConfigsAPIAction,
  getAllConfigsActionSuccess,
  getAllConfigsActionError,
  getAllConfigsLocalAction,
  deleteAllConfigsAction,
  deleteOneConfigAction,
  selectOneConfigAction,
} from '../../actions/configs.action';

export type ConfigsState = {
  loading: boolean;
  error: any;
  configs: Configs | undefined;
  // running: boolean;
};
const initialState: ConfigsState = {
  loading: false,
  error: null,
  configs: [],
  // running: false,
};

/* Creating a reducer that will handle the actions that are dispatched. */
export const userConfigsReducer = createReducer(initialState, builder => {
  return builder
    .addCase(getAllConfigsAPIAction, state => {
      state.loading = true;
    })
    .addCase(getAllConfigsLocalAction, state => {
      state.loading = true;
    })
    .addCase(deleteAllConfigsAction, state => {
      state.loading = true;
    })
    .addCase(deleteOneConfigAction, state => {
      state.loading = true;
    })
    .addCase(selectOneConfigAction, state => {
      state.loading = true;
    })
    .addCase(getAllConfigsActionSuccess, (state, action) => {
      state.loading = false;
      state.configs = action.payload;
    })
    .addCase(getAllConfigsActionError, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
});
