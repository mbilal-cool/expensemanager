import {store} from '../utils/Redux/store';
import {expenseList} from '../mockData';
import ReduxDispatchController from './reduxDispatchController';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';
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
  static getTotalUpdatedExpenses = () => {
    ExpenseController.getTotalExpenseRequest()
      .then(res => {
        ReduxDispatchController.Expense.setTotal(res);
      })
      .catch(err => console.log(err));
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
  static findAllExpensesHandler = call_back => {
    ExpenseController.findAllExpenseRequest()
      .then(res => {
        // console.log('find all expense request', res);
        call_back(false);
      })
      .catch(err => console.log(err));
  };
  static findAllExpenseRequest = currentDate => {
    return new Promise((resolve, reject) => {
      axios
        .get('https://expensemanagementsys.herokuapp.com/expApi/allExp')
        .then(response => {
          if (response.data.success) {
            ReduxDispatchController.Expense.saveAllExpensesInRedux(
              response.data,
            );
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
  static handletodayExpenseList = (currentDate, call_back) => {
    ExpenseController.todayExpenseRequest(currentDate)
      .then(res => {
        ReduxDispatchController.Expense.saveTodayExpensesInRedux(res.data);
        call_back(false);
      })
      .catch(err => console.log(err));
  };

  static todayExpenseRequest = currentDate => {
    // console.log('date today', typeof currentDate);
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://expensemanagementsys.herokuapp.com/expApi/daily?date=${currentDate}`,
        )
        .then(response => {
          if (response.data.success) {
            // console.log('today.....???', response.data);
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
  static handlePreviousDayExpenseList = (previousDate, call_back) => {
    ExpenseController.previousdayExpenseRequest(previousDate)
      .then(res => {
        ReduxDispatchController.Expense.savePreviousdayExpensesInRedux(
          res.data,
        );
        call_back(false);
      })
      .catch(err => console.log(err));
  };

  static previousdayExpenseRequest = previousDate => {
    // console.log('date today', typeof currentDate);
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://expensemanagementsys.herokuapp.com/expApi/daily?date=${previousDate}`,
        )
        .then(response => {
          if (response.data.success) {
            // console.log('today.....???', response.data);
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
  static getAllExpenseCatalogue = call_back => {
    ExpenseController.getAllExpenseCatalogueRequest()
      .then(res => {
        if (res.data.success) {
          // console.log('find catalogue expense response', res);

          ReduxDispatchController.Expense.saveCatalogueExpensesInRedux(
            res.data,
          );
          call_back(false);
        } else {
          call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static getAllExpenseCatalogueRequest = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          'https://expensemanagementsys.herokuapp.com/expApi/allExpCatalogues',
        )
        .then(response => {
          resolve(response);
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
        console.log('responseinhandler', res.data);
        if (res.data.success) {
          console.log(res.data, '????????');
          call_back(res);
          ReduxDispatchController.Expense.setExpenseList(obj);
          ExpenseController.getTotalUpdatedExpenses();
        } else {
          call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static addExpenseRequest = obj => {
    return new Promise((resolve, reject) => {
      axios
        .post('https://expensemanagementsys.herokuapp.com/expApi/addExp', obj)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };
  static addCatalogueExpense = (obj, call_back, call_back_err) => {
    console.log('expenseData to be added in catlog', obj);
    ExpenseController.addCatalogueExpenseRequest(obj)
      .then(res => {
        if (res.data.success) {
          console.log(res.data, '????????');
          call_back(res);
          ReduxDispatchController.Expense.addCatalogueExpensesInRedux(obj);
        } else {
          reject(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static addCatalogueExpenseRequest = obj => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://expensemanagementsys.herokuapp.com/expApi/addExpCatalogue',
          obj,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
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

  static updateTodayExpenceItem = (obj, _call_back) => {
    console.log('object to b updated--', obj);
    ExpenseController.updateExpenseItemRequest(obj)
      .then(res => {
        if (res.data.success) {
          _call_back(res.data);
          ReduxDispatchController.Expense.updateTodayExpense(obj);
        } else {
          _call_back(res.error.message);
        }
      })
      .catch(error => console.log(error));
  };
  static updateTodayExpenseItemRequest = obj => {
    console.log('object in controller:', obj, 'expenseId: ', obj._id);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `https://expensemanagementsys.herokuapp.com/expApi/updateExp/${obj._id}`,
          obj,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error!');
        });
    });
  };
  static updateExpenceItem = (obj, _call_back) => {
    console.log('object to b updated--', obj);
    ExpenseController.updateExpenseItemRequest(obj)
      .then(res => {
        if (res.data.success) {
          _call_back(res.data);
          ReduxDispatchController.Expense.updateExpense(obj);
        } else {
          _call_back(res.error.message);
        }
      })
      .catch(error => console.log(error));
  };
  static updateExpenseItemRequest = obj => {
    console.log('object in controller:', obj, 'expenseId: ', obj._id);
    return new Promise((resolve, reject) => {
      axios
        .put(
          `https://expensemanagementsys.herokuapp.com/expApi/updateExp/${obj._id}`,
          obj,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error!');
        });
    });
  };
  static updateCatalogExpence = (obj, _call_back) => {
    ExpenseController.updateCatalogExpenseItemRequest(obj)
      .then(res => {
        if (res.data.success) {
          _call_back(res.data);
          ReduxDispatchController.Expense.updateCatalogExpenseFromRedux(obj);
        } else {
          _call_back(res.error.message);
        }
      })
      .catch(error => console.log(error));
  };
  static updateCatalogExpenseItemRequest = obj => {
    console.log(
      'object in controller000---update catalog:',
      obj,
      'expenseId: ',
      obj._id,
    );
    return new Promise((resolve, reject) => {
      axios
        .put(
          `https://expensemanagementsys.herokuapp.com/expApi/updateExpCatalogue/${obj._id}`,
          obj,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error!');
        });
    });
  };
  static DeleteExpenceItem = (id, call_back, loading) => {
    console.log('expense_id to be deleted', id);
    ExpenseController.deleteExpenseRequest(id)
      .then(res => {
        if (res.data.success) {
          ReduxDispatchController.Expense.deleteExpense(id);
          call_back(res.data.data);
          loading(false);
          ExpenseController.getTotalUpdatedExpenses();
        } else {
          res.data.message;
        }
      })
      .catch(err => call_back(err));
  };
  static DeleteExpenceItemFromCatalog = (id, call_back, loading) => {
    console.log('catlog ------expense_id', id);
    ExpenseController.deleteExpenseFromCatalogRequest(id)
      .then(res => {
        if (res.data.success) {
          ReduxDispatchController.Expense.deleteCatalogExpenseFromRedux(id);
          call_back(res.data.data);
          loading(false);
        } else {
          res.data.message;
        }
      })
      .catch(err => call_back(err));
  };
  static deleteExpenseFromCatalogRequest = id => {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `https://expensemanagementsys.herokuapp.com/expApi/deleteExpCatalogue/${id}`,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };
  static deleteExpenseRequest = id => {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          `https://expensemanagementsys.herokuapp.com/expApi/deleteExp/${id}`,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
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
  static dateSlicer = date => {
    return date.slice(0, 10);
  };
}

export default ExpenseController;
export const categorySelector = cat_id => {
  const allCategories = useSelector(state => state.expense.expenseCategories);
  const newArr = [...allCategories];
  const newObj = newArr.find(item => item._id == cat_id);
  return newObj?.name;
};
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
export const useGetSingleExpenceCategory = id => {
  const totalExpenseCa = useSelector(state => state.expense.expenses);
  if (allExpenseCategories.length > 0) {
    const signleItem = allExpenseCategories.find(
      singleExpenseCategory => singleExpenseCategory.id === id,
    );

    return signleItem;
  } else {
    return undefined;
  }
};
export const useGetExpensesDetails = type => {
  switch (type) {
    case 'all': {
      return useSelector(state => state.expense.allExpenses);
    }
    case 'today': {
      return useSelector(state => state.expense.todayExpenses);
    }
    case 'previous': {
      return useSelector(state => state.expense.previousdayExpenses);
    }
    default:
      return;
  }
};

export const useFilteredMostRecent = currentDate => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ExpenseController.findAllExpensesHandler(res => {
      console.log('api called');
      setLoading(false);
    });
  }, []);

  const allExpenses = useSelector(state => state.expense.allExpenses);
  let filtered = allExpenses.filter(
    singleExpense =>
      ExpenseController.dateSlicer(singleExpense.createdAt) == currentDate,
  );

  return {allExpenses: filtered, loading};
};
