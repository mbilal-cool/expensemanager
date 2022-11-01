import {configureStore} from '@reduxjs/toolkit';

import expenseSlice from './Slices/expenseSlice';
export const store = configureStore({
  reducer: {
    expense: expenseSlice,
  },
});
