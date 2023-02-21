import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../reducers';

export const selectConfigsState = (state: RootState) => state.configs.configs;

export const selectConfigs = createSelector(
  selectConfigsState,
  state => state.configs,
);
export const selectConfigsLoading = createSelector(
  selectConfigsState,
  state => state.loading,
);
export const selectConfigsError = createSelector(
  selectConfigsState,
  state => state.error,
);
export const selectConfigSelected = createSelector(selectConfigs, configs => {
  return configs && configs.filter(config => config.isSelected === true);
});
