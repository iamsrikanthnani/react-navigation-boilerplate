import {combineReducers} from '@reduxjs/toolkit';
import configReducer from './ConfigRedux/slice';

export const allReducers = combineReducers({
  config: configReducer,
});
