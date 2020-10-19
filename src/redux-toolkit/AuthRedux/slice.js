import {createSlice} from '@reduxjs/toolkit';
import {login} from 'redux-toolkit/AuthRedux/handler';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    token: null,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, {payload}) => {
      state.token = payload.token;
      state.currentUser = payload;
    },
    [login.rejected]: (state, {error}) => {},
  },
});

const {actions, reducer: authReducer} = authSlice;
export const {} = actions;
export default authReducer;
