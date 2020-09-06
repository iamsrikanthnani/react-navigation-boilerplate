import {createSlice} from '@reduxjs/toolkit';
import * as handler from './handler';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    language: 'en',
  },
  reducers: {},
  extraReducers: {},
});

const {actions, reducer: configReducer} = configSlice;
export const {} = actions;
export default configReducer;
