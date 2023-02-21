import {combineReducers} from '@reduxjs/toolkit';
import {userConfigsReducer} from './configs.reducer';

const configsReducer = combineReducers({
  configs: userConfigsReducer,
});

export default configsReducer;
