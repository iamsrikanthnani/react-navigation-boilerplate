import {createSlice} from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    language: 'en',
  },
  reducers: {
    changeLanguage: (state, action) => {},
  },
});

export const {actions, reducer: configReducer} = configSlice;
export default configReducer;
