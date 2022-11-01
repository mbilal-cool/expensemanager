import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {expenseList} from '../../../mockData';
const initialState = {
  totalExpense: 0,
  expenses: expenseList,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,

  reducers: {
    setTotalExpense: (state, action) => {
      state.totalExpense = action.payload.totalAmount;
    },
    setExpense: (state, action) => {
      console.log(action.payload);

      state.expenses.push(action.payload);
    },

    updateSingleExpense: (state, action) => {
      const singleItemIndex = state.expenses.findIndex(
        singleExpense => singleExpense.id === action.payload.id,
      );
      console.log(singleItemIndex);
      if (singleItemIndex) {
        const {id, ...rest} = action.payload.obj;
        const newObjectWithoutId = {...rest};
        const newObj = {id: action.payload.id, ...newObjectWithoutId};
        state.expenses[singleItemIndex] = newObj;
      } else {
        console.log('item not get by id for update in expense reducer');
      }
    },
    deleteSingleExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        singleExpense => singleExpense.id != action.payload,
      );
    },
  },
});

export const {
  setTotalExpense,
  setExpense,
  updateSingleExpense,
  deleteSingleExpense,
} = expenseSlice.actions;
export default expenseSlice.reducer;
