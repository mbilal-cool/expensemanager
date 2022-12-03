import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import ExpenseController, {
  dateConverter,
  convertPreviousDate,
  dateSlicer,
} from '../../../Controller/expenseController';
const initialState = {
  totalExpense: 0,
  allExpenses: [],
  catalogueExpenses: [],
  expenseCategories: [],
  todayExpenses: [],
  previousdayExpenses: [],
  monthWithYear: [],
  thisWeek: [],
  lastWeek: [],
  dateRange: [],
  dateQuery: {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    prepaerdDate: undefined,
    toggle: false,
  },
  searchResultsFromCatalog: [],
};
const arr = [
  'allExpenses',
  'todayExpenses',
  'monthWithYear',
  'thisWeek',
  'lastWeek',
  'dateRange',
];
const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addInSearchResultsFromCatalog: (state, action) => {
      state.searchResultsFromCatalog = action.payload;
    },
    saveSearchResultsFromCatalog: (state, action) => {
      state.searchResultsFromCatalog = action.payload;
    },
    setAllExpenses: (state, action) => {
      state.allExpenses = action.payload.data;
    },
    setTodayExpenses: (state, action) => {
      state.todayExpenses = action.payload;
    },
    setPrevioousdayExpenses: (state, action) => {
      state.previousdayExpenses = action.payload;
    },
    setFiltersMonthWithYear: (state, action) => {
      state.monthWithYear = action.payload;
    },
    setFiltersWithThisWeek: (state, action) => {
      state.thisWeek = action.payload;
    },
    setFiltersWithDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setFiltersWithLastWeek: (state, action) => {
      state.lastWeek = action.payload;
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
      state.allExpenses.push(action.payload);
      let check_By_Date = dateSlicer(action.payload.createdAt);
      if (check_By_Date == dateConverter(new Date())) {
        state.todayExpenses.push(action.payload);
        state.monthWithYear.push(action.payload);
      } else if (check_By_Date == convertPreviousDate(new Date())) {
        state.previousdayExpenses.push(action.payload);
      }
    },
    updateSingleExpense: (state, action) => {
      for (let index = 0; index < arr.length; index++) {
        const singleItemIndex = state[arr[index]].findIndex(
          singleExpense => singleExpense._id === action.payload._id,
        );
        if (singleItemIndex >= 0) {
          console.log('index', singleItemIndex);

          state[arr[index]][singleItemIndex] = action.payload;
        } else {
          console.log(
            'item not get by id for update in expense reducer for ',
            arr[index],
          );
        }
      }
    },
    updateSingletodayExpense: (state, action) => {
      // console.log('singid', action.payload._id, 'ye lo', action.payload);
      const singleItemIndex = state.todayExpenses.findIndex(
        singleExpense => singleExpense._id === action.payload._id,
      );
      // console.log('index found on the base of expid', singleItemIndex);
      if (singleItemIndex >= 0) {
        state.todayExpenses[singleItemIndex] = action.payload;
      } else {
        console.log('item not get by id for update in expense reducer');
      }
    },
    updateSingleCatalogExpense: (state, action) => {
      const singleItemIndex = state.catalogueExpenses.findIndex(
        singleExpense => singleExpense._id === action.payload._id,
      );
      if (singleItemIndex >= 0) {
        console.log('index found on the base of expid', singleItemIndex);
        state.catalogueExpenses[singleItemIndex] = action.payload;
      } else {
        console.log('item not get by id for update in expense reducer');
      }
    },
    deleteSingleExpense: (state, action) => {
      console.log('expense id to be deleted', action.payload);
      for (let index = 0; index < arr.length; index++) {
        state[arr[index]] = state[arr[index]].filter(
          singleExpense => singleExpense._id != action.payload,
        );
      }
    },
    deleteCatalogExpense: (state, action) => {
      const allCatalogues = state.catalogueExpenses;
      const newCatalogue = allCatalogues.filter(
        singleExpense => singleExpense._id != action.payload,
      );
      state.catalogueExpenses = newCatalogue;
    },
    setExpenseCategories: (state, action) => {
      // console.log('actionpaload of categoriesddddddd', action.payload);

      state.expenseCategories = action.payload.data;
    },
    addExpenseCategories: (state, action) => {
      // console.log('actionpaload of categories', action.payload);
      state.expenseCategories.push(action.payload);
    },
    updateDateQuery: (state, action) => {
      // console.log('update date query in redux', action.payload);
      state.dateQuery[action.payload.type] = action.payload.value;
    },
  },
});
export const {
  addInSearchResultsFromCatalog,
  saveSearchResultsFromCatalog,
  setFiltersWithThisWeek,
  setFiltersWithLastWeek,
  setFiltersWithDateRange,
  updateSingletodayExpense,
  deleteCatalogExpense,
  setTodayExpenses,
  setFiltersMonthWithYear,
  setPrevioousdayExpenses,
  setTotalExpense,
  setExpense,
  updateSingleExpense,
  deleteSingleExpense,
  setExpenseCategories,
  addExpenseCategories,
  setAllExpenses,
  setCatalogueExpenses,
  addCatalogueExpenses,
  updateSingleCatalogExpense,
  updateDateQuery,
} = expenseSlice.actions;
export default expenseSlice.reducer;
