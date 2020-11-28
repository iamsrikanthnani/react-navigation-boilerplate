import {combineReducers} from '@reduxjs/toolkit';
import configReducer from 'redux-toolkit/Config';
import authReducer from 'redux-toolkit/Auth';
import taskReducer from 'redux-toolkit/Task';

export const allReducers = combineReducers({
  config: configReducer,
  auth: authReducer,
  task: taskReducer,
});
