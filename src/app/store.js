import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/Auth/authSlice';
import postSlice from '../features/Posts/postSlice';
import userSlice from '../features/Users/userSlice';

export const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    auth: authSlice.reducer,
    allUsers: userSlice.reducer,
  },
});
