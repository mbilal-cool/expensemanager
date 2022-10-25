import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('https://reqres.in/api/users?delay=1');
  return await response.json();
});

const initialState = {
  totalExpense: 0,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,

  reducers: {
    setTotalExpense: (state, action) => {
      //   console.log('gggggggg', action.payload.totalAmount);
      state.totalExpense = action.payload.totalAmount;
    },
  },
});

export const {setTotalExpense} = expenseSlice.actions;
export default expenseSlice.reducer;
