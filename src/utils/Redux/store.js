import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Redux/Slices/messageSlices';

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
