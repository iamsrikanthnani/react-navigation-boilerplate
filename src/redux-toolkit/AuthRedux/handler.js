import {createAsyncThunk} from '@reduxjs/toolkit';
import {post} from 'api';

//call login api
const login = createAsyncThunk(
  'auth/login',
  async (loginData, {rejectWithValue}) => {
    try {
      const response = await post('/auth/login', loginData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export {login};
