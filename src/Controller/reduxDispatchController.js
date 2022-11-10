import {store} from '../utils/Redux/store';
import {setUser, clearUser} from '../utils/Redux/Slices/authSlice';

import {
  setTotalExpense,
  setExpense,
  updateSingleExpense,
  deleteSingleExpense,
  setExpenseCategories,
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
    setTotal: res => {
      store.dispatch(setTotalExpense(res));
    },
    setExpenseList: obj => {
      store.dispatch(setExpense(obj));
    },
    updateExpense: obj => {
      store.dispatch(updateSingleExpense(obj));
    },
    deleteExpense: id => {
      store.dispatch(deleteSingleExpense(id));
    },
    saveExpenseCategoriesInRedux: categories => {
      store.dispatch(setExpenseCategories(categories));
    },
  };
}
export default ReduxDispatchController;
