import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {expenseList} from '../../../mockData';
const initialState = {
  totalExpense: 0,
  allExpenses: [],
  catalogueExpenses: [],
  expenseCategories: [],
  todayExpenses: [],
  previousdayExpenses: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,

  reducers: {
    setAllExpenses: (state, action) => {
      state.allExpenses = action.payload.data;
    },
    setTodayExpenses: (state, action) => {
      state.todayExpenses = action.payload;
    },
    setPrevioousdayExpenses: (state, action) => {
      state.previousdayExpenses = action.payload;
    },
    setCatalogueExpenses: (state, action) => {
      state.catalogueExpenses = action.payload.data;
    },

    addCatalogueExpenses: (state, action) => {
      state.catalogueExpenses.push(action.payload);
    },
    setTotalExpense: (state, action) => {
      state.totalExpense = action.payload.data[0].totalExpense;
    },
    setExpense: (state, action) => {
      // console.log(action.payload);

      state.allExpenses.push(action.payload);
    },

    updateSingleExpense: (state, action) => {
      // console.log('singid', action.payload._id, 'ye lo', action.payload);
      const singleItemIndex = state.allExpenses.findIndex(
        singleExpense => singleExpense._id === action.payload._id,
      );
      console.log('index found on the base of expid', singleItemIndex);
      if (singleItemIndex >= 0) {
        state.allExpenses[singleItemIndex] = action.payload;
      } else {
        console.log('item not get by id for update in expense reducer');
      }
    },
    updateSingletodayExpense: (state, action) => {
      console.log('singid', action.payload._id, 'ye lo', action.payload);
      const singleItemIndex = state.todayExpenses.findIndex(
        singleExpense => singleExpense._id === action.payload._id,
      );
      console.log('index found on the base of expid', singleItemIndex);
      if (singleItemIndex >= 0) {
        state.todayExpenses[singleItemIndex] = action.payload;
      } else {
        console.log('item not get by id for update in expense reducer');
      }
    },
    updateSingleCatalogExpense: (state, action) => {
      // console.log(
      //   'update single catalog expense -----singid',
      //   action.payload._id,
      //   'ye lo',
      //   action.payload,
      // );
      const singleItemIndex = state.catalogueExpenses.findIndex(
        singleExpense => singleExpense._id === action.payload._id,
      );
      console.log('index found on the base of expid', singleItemIndex);
      if (singleItemIndex >= 0) {
        state.catalogueExpenses[singleItemIndex] = action.payload;
      } else {
        console.log('item not get by id for update in expense reducer');
      }
    },
    deleteSingleExpense: (state, action) => {
      state.allExpenses = state.allExpenses.filter(
        singleExpense => singleExpense._id != action.payload,
      );
    },
    deleteCatalogExpense: (state, action) => {
      const allCatalogues = state.catalogueExpenses;
      const newCatalogue = allCatalogues.filter(
        singleExpense => singleExpense._id != action.payload,
      );
      state.catalogueExpenses = newCatalogue;
    },
    setExpenseCategories: (state, action) => {
      state.expenseCategories = action.payload.data;
    },
  },
});

export const {
  updateSingletodayExpense,
  deleteCatalogExpense,
  setTodayExpenses,
  setPrevioousdayExpenses,
  setTotalExpense,
  setExpense,
  updateSingleExpense,
  deleteSingleExpense,
  setExpenseCategories,
  setAllExpenses,
  setCatalogueExpenses,
  addCatalogueExpenses,
  updateSingleCatalogExpense,
} = expenseSlice.actions;
export default expenseSlice.reducer;
