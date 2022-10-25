import {useSelector} from 'react-redux';

import {store} from '../utils/Redux/store';
import ReduxDispatchController from './reduxDispatchController';
class ExpenseController {
  static getTotalExpenses = call_back => {
    const totalExpenseInReducer = store.getState().expense.totalExpense;

    totalExpenseInReducer === 0
      ? ExpenseController.getTotalExpenseRequest()
          .then(res => {
            ReduxDispatchController.Expense.setTotal(res);
            call_back(res);
          })
          .catch(err => call_back(err))
      : null;
  };
  static getTotalExpenseRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
          totalAmount: '4,000,000',
        });
        // reject({success: false, errorMessage: 'netWork Error'});
      }, 5000);
    });
  };
}

export default ExpenseController;
