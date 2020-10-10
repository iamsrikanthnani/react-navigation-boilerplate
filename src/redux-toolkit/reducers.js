import {combineReducers} from '@reduxjs/toolkit';
import configReducer from 'redux-toolkit/ConfigRedux/slice';
import authReducer from 'redux-toolkit/AuthRedux/slice';

export const allReducers = combineReducers({
  config: configReducer,
  auth: authReducer,
});
