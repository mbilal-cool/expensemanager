import {store} from '../utils/Redux/store';
import {setTotalExpense} from '../utils/Redux/Slices/expenseSlice';
class ReduxDispatchController {
  static Expense = {
    setTotal: res => {
      store.dispatch(setTotalExpense(res));
    },
  };
}
export default ReduxDispatchController;
