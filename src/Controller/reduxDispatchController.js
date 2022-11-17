import {store} from '../utils/Redux/store';
import {setUser, clearUser} from '../utils/Redux/Slices/authSlice';

import {
  setTodayExpenses,
  setPrevioousdayExpenses,
  setTotalExpense,
  setExpense,
  updateSingleExpense,
  updateSingletodayExpense,
  deleteSingleExpense,
  setExpenseCategories,
  addExpenseCategories,
  setAllExpenses,
  setCatalogueExpenses,
  addCatalogueExpenses,
  deleteCatalogExpense,
  updateSingleCatalogExpense,
} from '../utils/Redux/Slices/expenseSlice';
class ReduxDispatchController {
  static Auth = {
    SaveUserInRedux: user => {
      store.dispatch(setUser(user));
    },
    clearUserFromRedux: () => {
      store.dispatch(clearUser());
    },
  };
  static Expense = {
    saveAllExpensesInRedux: res => {
      store.dispatch(setAllExpenses(res));
    },
    saveTodayExpensesInRedux: res => {
      store.dispatch(setTodayExpenses(res));
    },
    savePreviousdayExpensesInRedux: res => {
      store.dispatch(setPrevioousdayExpenses(res));
    },
    saveCatalogueExpensesInRedux: res => {
      store.dispatch(setCatalogueExpenses(res));
    },
    addCatalogueExpensesInRedux: res => {
      store.dispatch(addCatalogueExpenses(res));
    },
    setTotal: res => {
      store.dispatch(setTotalExpense(res));
    },
    setExpenseList: obj => {
      store.dispatch(setExpense(obj));
    },
    updateExpense: obj => {
      store.dispatch(updateSingleExpense(obj));
    },
    updateTodayExpense: obj => {
      store.dispatch(updateSingletodayExpense(obj));
    },
    deleteExpense: id => {
      store.dispatch(deleteSingleExpense(id));
    },
    deleteCatalogExpenseFromRedux: id => {
      store.dispatch(deleteCatalogExpense(id));
    },
    updateCatalogExpenseFromRedux: id => {
      store.dispatch(updateSingleCatalogExpense(id));
    },
    saveExpenseCategoriesInRedux: categories => {
      store.dispatch(setExpenseCategories(categories));
    },
    addExpenseCategoriesInRedux: res => {
      store.dispatch(addExpenseCategories(res));
    },
  };
}
export default ReduxDispatchController;
