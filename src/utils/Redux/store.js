import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../Redux/Slices/messageSlices';
import expenseSlice from './Slices/expenseSlice';
export const store = configureStore({
  reducer: {
    users: userReducer,
    expense: expenseSlice,
  },
});
