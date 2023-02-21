import {combineReducers} from '@reduxjs/toolkit';
import configsReducer from './configs';
import {plansReducer} from './plan.reducer';

const rootReducer = combineReducers({
  configs: configsReducer,
  plans: plansReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
