import {createSlice} from '@reduxjs/toolkit';
import * as handler from 'redux-toolkit/AuthRedux/handler';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    token: null,
  },
  reducers: {},
  extraReducers: {},
});

const {actions, reducer: authReducer} = authSlice;
export const {} = actions;
export default authReducer;
