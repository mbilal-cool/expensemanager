import {store} from '../utils/Redux/store';
import {
  setTotalExpense,
  setExpense,
  updateSingleExpense,
  deleteSingleExpense,
} from '../utils/Redux/Slices/expenseSlice';
class ReduxDispatchController {
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
  };
}
export default ReduxDispatchController;
