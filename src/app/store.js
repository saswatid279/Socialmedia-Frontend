import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/Auth/authSlice';
//import counterReducer from '../features/counter/counterSlice';
import postSlice from '../features/Posts/postSlice';

export const store = configureStore({
  reducer: {
    //counter: counterReducer,
    posts: postSlice.reducer,
    auth: authSlice.reducer,
  },
});
