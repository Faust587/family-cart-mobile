import {configureStore} from '@reduxjs/toolkit';
import {setStore} from '../api';
import authSlice from './auth/authSlice';
import cartSlice from './cart/cartSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
  },
});

setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
