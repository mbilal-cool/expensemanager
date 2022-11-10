import {store} from '../utils/Redux/store';
import {expenseList} from '../mockData';
import ReduxDispatchController from './reduxDispatchController';
import {useSelector} from 'react-redux';
import axios from 'axios';
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
      axios
        .get('https://expensemanagementsys.herokuapp.com/expApi/totalExp')
        .then(response => {
          if (response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(error => {
          // console.log(error, '????????');

          reject('Network Error');
        });
    });
  };
  static handletodayExpenseList = (currentDate, call_back) => {
    ExpenseController.todayExpenseRequest(currentDate)
      .then(res => {
        console.log('response in handler', res);
        call_back(false);
      })
      .catch(err => console.log(err));
  };
  static todayExpenseRequest = currentDate => {
    console.log('date today', currentDate);
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://expensemanagementsys.herokuapp.com/expApi/daily?${currentDate}`,
        )
        .then(response => {
          if (response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };

  static handleAddExpense = (obj, call_back, call_back_err) => {
    console.log('expenseData to be added', obj);
    ExpenseController.addExpenseRequest(obj)
      .then(res => {
        call_back(res);
        ReduxDispatchController.Expense.setExpenseList(obj);
      })
      .catch(err => console.log(err));
  };
  static addExpenseRequest = obj => {
    return new Promise((resolve, reject) => {
      axios
        .post('https://expensemanagementsys.herokuapp.com/expApi/addExp', obj)
        .then(response => {
          console.log(response.data, '????????');
          if (response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(error => {
          console.log(error, '????????');

          reject('Network Error');
        });
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
  static handlegetExpenseCategories = call_back => {
    ExpenseController.getExpenseCategoryListRequest().then(res => {
      if (res) {
        ReduxDispatchController.Expense.saveExpenseCategoriesInRedux(res),
          call_back(false);
      }
    });
  };
  static getExpenseCategoryListRequest = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          'https://expensemanagementsys.herokuapp.com/expApi/allExpCategories',
        )
        .then(response => {
          if (response.data.success) {
            resolve(response.data);
          } else {
            reject(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
          reject('Network Error');
        });
    });
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
