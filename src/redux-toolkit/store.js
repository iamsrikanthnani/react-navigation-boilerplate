import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import logger from 'redux-logger';
import reduxPersist from './persist';
import {allReducers} from './reducers';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

if (__DEV__) {
  middleware.push(logger);
}

const persistWraperReducer = persistReducer(reduxPersist, allReducers);

export const store = configureStore({
  reducer: persistWraperReducer,
  middleware,
  devTools: __DEV__,
});

export const persistor = persistStore(store);
