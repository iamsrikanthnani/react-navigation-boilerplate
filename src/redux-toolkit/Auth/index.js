import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// handle api

export const login = createAsyncThunk(
  'auth/userLogin',
  async (params, {rejectWithValue}) => {
    try {
    } catch (error) {}
  },
);

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

export const {actions, reducer: authReducer} = authSlice;

export default authReducer;
