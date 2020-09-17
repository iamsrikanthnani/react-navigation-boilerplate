import {combineReducers} from '@reduxjs/toolkit';
import configReducer from './ConfigRedux/slice';
import authReducer from './AuthRedux/slice';

export const allReducers = combineReducers({
  config: configReducer,
  auth: authReducer,
});
