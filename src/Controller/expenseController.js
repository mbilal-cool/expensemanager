import {store} from '../utils/Redux/store';
import {expenseList} from '../mockData';
import ReduxDispatchController from './reduxDispatchController';
import {useSelector} from 'react-redux';
class ExpenseController {
  static getTotalExpenses = (call_back_res, call_back_err) => {
    const totalExpenseInReducer = store.getState().expense.totalExpense;

    totalExpenseInReducer === 0
      ? ExpenseController.getTotalExpenseRequest()
          .then(res => {
            ReduxDispatchController.Expense.setTotal(res);
            call_back_res(false);
          })
          .catch(err => call_back_err(false))
      : call_back_res(false);
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
  static handleExpenseList = call_back => {
    ExpenseController.expenseRequest().then(res => {
      call_back(false);
    });
  };
  static expenseRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,

          data: expenseList,
        });
        // reject({success: false, errorMessage: 'netWork Error'});
      }, 5000);
    });
  };

  static handleAddExpense = (obj, call_back, call_back_err) => {
    ExpenseController.addExpenseRequest().then(
      res => call_back(res),
      ReduxDispatchController.Expense.setExpenseList(obj),
    );
  };
  static addExpenseRequest = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          success: true,
        });
        // reject({success: false, errorMessage: 'netWork Error'});
      }, 5000);
    });
  };

  static ExtractSExpense = id => {
    const totalExpense = store.getState().expense.expenses;

    if (totalExpense.length > 0) {
      const signleItem = totalExpense.find(
        singleExpense => singleExpense.id === id,
      );

      return signleItem;
    } else {
      return undefined;
    }
  };

  static updateExpenceItem = obj => {
    ReduxDispatchController.Expense.updateExpense(obj);
  };
  static DeleteExpenceItem = id => {
    ReduxDispatchController.Expense.deleteExpense(id);
  };
}

export default ExpenseController;

export const useGetSingleExpence = id => {
  const totalExpense = useSelector(state => state.expense.expenses);
  if (totalExpense.length > 0) {
    const signleItem = totalExpense.find(
      singleExpense => singleExpense.id === id,
    );

    return signleItem;
  } else {
    return undefined;
  }
};
