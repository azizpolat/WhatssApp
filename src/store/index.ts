import {configureStore} from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';
import chatsSlice from './slice/chatsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatsSlice,
  },
});
