import {store} from '../utils/Redux/store';
import {expenseList} from '../mockData';
import ReduxDispatchController from './reduxDispatchController';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {useEffect} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const getMonthNumber = month => {
  // console.log('switch switch', month);
  switch (month) {
    case 'January':
      return '01';
    case 'Feburary':
      return '02';
    case 'March':
      return '03';
    case 'April':
      return '04';
    case 'May':
      return '05';
    case 'June':
      return '06';
    case 'July':
      return '07';
    case 'August':
      return '08';
    case 'September':
      return '09';
    case 'Octobor':
      return '10';
    case 'November':
      return '11';
    case 'December':
      return '12';
    default:
      return;
  }
};
class ExpenseController {
  static recentSearchResultsFromCatalog = 'recentSearchResults';
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
        if (res.data.success) {
          console.log('responseinhandler', res.data.data.obj);
          call_back(res);
          ReduxDispatchController.Expense.setExpenseList(res.data.data.obj);
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
  static handleFindExpenseByMonthWithYear = (dateQuery, call_back) => {
    ExpenseController.findByMonthWithYearRequest(dateQuery)
      .then(res => {
        if (res.data.success) {
          // console.log('responseinhandler', res.data.data);
          call_back(res.data.data);
          ReduxDispatchController.Expense.setFiltersMonthWithYearInRedux(
            res.data.data,
          );
        } else {
          call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static findByMonthWithYearRequest = dateQuery => {
    // console.log('qqqqq????', getMonthNumber(dateQuery.month), dateQuery.year);

    return new Promise((resolve, reject) => {
      let baseUrl;
      if (dateQuery.month == 'Whole Year') {
        baseUrl = `https://expensemanagementsys.herokuapp.com/expApi/yearly?year=${dateQuery.year}`;
      } else {
        baseUrl = `https://expensemanagementsys.herokuapp.com/expApi/monthly?month=${getMonthNumber(
          dateQuery.month,
        )}&year=${dateQuery.year}`;
      }
      axios
        .get(baseUrl)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };
  static handleFindExpenseByThisWeek = (dateRange, call_back) => {
    ExpenseController.findByThisWeekRequest(dateRange)
      .then(res => {
        if (res.data.success) {
          // console.log('responseinhandler of thissss', res.data.data);
          call_back(res.data.data);
          ReduxDispatchController.Expense.setFiltersWithThisWeekInRedux(
            res.data.data,
          );
        } else {
          call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static findByThisWeekRequest = dateRange => {
    // console.log('qqqqq????', dateRange.sDate, dateRange.eDate);

    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://expensemanagementsys.herokuapp.com/expApi/dateRange?sdate=${dateRange.eDate}&edate=${dateRange.sDate}`,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };
  static handleFindExpenseByLastWeek = (dateRange, call_back) => {
    ExpenseController.findByLastWeekRequest(dateRange)
      .then(res => {
        if (res.data.success) {
          // console.log('responseinhandler of Last', res.data.data);
          call_back(res.data.data);
          ReduxDispatchController.Expense.setFiltersWithLastWeekInRedux(
            res.data.data,
          );
        } else {
          call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static findByLastWeekRequest = dateRange => {
    // console.log('qqqqq????jaan', dateRange.sDate, dateRange.eDate);

    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://expensemanagementsys.herokuapp.com/expApi/dateRange?sdate=${dateRange.eDate}&edate=${dateRange.sDate}`,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };
  static handleFindExpenseByDateRange = (dateRange, call_back) => {
    ExpenseController.findByDateRangeRequest(dateRange)
      .then(res => {
        if (res.data.success) {
          // console.log('responseinhandler of DateRange', res.data.data);
          call_back(res.data.data);
          ReduxDispatchController.Expense.setFiltersWithDateRangeInRedux(
            res.data.data,
          );
        } else {
          call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static findByDateRangeRequest = dateRange => {
    // console.log('qqqqq????jaan', dateRange.eDate, dateRange.sDate);

    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://expensemanagementsys.herokuapp.com/expApi/dateRange?sdate=${dateRange.sDate}&edate=${dateRange.eDate}`,
        )
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject('Network Error');
        });
    });
  };
  static addCatalogueExpense = (obj, call_back, call_back_err) => {
    // console.log('expenseData to be added in catlog', obj);
    ExpenseController.addCatalogueExpenseRequest(obj)
      .then(res => {
        if (res.data.success) {
          // console.log(res.data, '????????');
          call_back(res);
          ReduxDispatchController.Expense.addCatalogueExpensesInRedux(
            res.data.data.obj,
          );
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
    // console.log('object to b updated--', obj);
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
    // console.log('object in controller:', obj, 'expenseId: ', obj._id);
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
    // console.log('object to b updated--', obj);
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
    // console.log('object in controller:', obj, 'expenseId: ', obj._id);
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
    // console.log(
    //   'object in controller000---update catalog:',
    //   obj,
    //   'expenseId: ',
    //   obj._id,
    // );
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
    // console.log('catlog ------expense_id', id);
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
  static addExpenseCategories = (exp_category, call_back) => {
    ExpenseController.addExpenseCategoryRequest(exp_category)
      .then(res => {
        // console.log('ressss', res.data.obj);
        if (res) {
          ReduxDispatchController.Expense.addExpenseCategoriesInRedux(
            res.data.obj,
          ),
            call_back(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };
  static addExpenseCategoryRequest = exp_category => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          'https://expensemanagementsys.herokuapp.com/expApi/addExpCategory',
          {
            name: exp_category,
          },
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
  static addInRecentSearchResultsFromCatalog = itemsArray => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.recentSearchResultsFromCatalog)
        .then(res => {
          if (res !== null) {
            const resultArray = JSON.parse(res);
            console.log(resultArray, 'resultArray');
            const newlyArray = itemsArray.concat(resultArray);
            console.log(newlyArray, 'newlyArraynewlyArray');
            AsyncStorage.setItem(
              this.recentSearchResultsFromCatalog,
              JSON.stringify(newlyArray),
            )
              .then(res => {
                resolve(newlyArray);
                console.log('res in redux', res);
              })
              .catch(err => reject(err));
          } else {
            console.log('return null');
            AsyncStorage.setItem(
              this.recentSearchResultsFromCatalog,
              JSON.stringify(itemsArray),
            )
              .then(res => {
                resolve(itemsArray);
                console.log('res in redux', res);
              })
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    });
  };
  static clearRecentCatalogueSearchResultsAsync = () => {
    AsyncStorage.removeItem(this.recentSearchResultsFromCatalog);
  };
  static getRecentSearchResultsFromCatalog = () => {
    AsyncStorage.getItem(this.recentSearchResultsFromCatalog)
      .then(res => {
        if (res !== null) {
          ReduxDispatchController.Expense.saveSearchResultsFromCatalogInRedux(
            JSON.parse(res),
          );
        } else {
          ReduxDispatchController.Expense.saveSearchResultsFromCatalogInRedux(
            [],
          );
        }
      })
      .catch(err => reject(err));
  };

  static dateSlicer = date => {
    return date.slice(0, 10);
  };
}
export default ExpenseController;
export const dateSlicer = date => {
  return date.slice(0, 10);
};
export const categorySelector = cat_id => {
  const allCategories = useSelector(state => state.expense.expenseCategories);
  const newArr = [...allCategories];
  const newObj = newArr.find(item => item._id == cat_id);
  return newObj?.name;
};
export const useCategorySelector = cat_id => {
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
      const allExpenses = useSelector(state => state.expense.allExpenses);
      let previousExpenses = allExpenses.filter(
        singleExpense =>
          ExpenseController.dateSlicer(singleExpense.createdAt) !=
          dateConverter(new Date()),
      );
      return previousExpenses;
    }
    default:
      return;
  }
};
export const useFilteredMostRecent = currentDate => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ExpenseController.findAllExpensesHandler(res => {
      // console.log('api called');
      setLoading(false);
    });
  }, []);
  const recentlyAdded = useSelector(state => state.expense.allExpenses);
  let filtered = recentlyAdded.slice(-7);
  return {recentlyAdded: filtered, loading};
};
export const useGetPrevious = (currentDate, setLoading) => {
  useEffect(() => {
    ExpenseController.findAllExpensesHandler(res => {
      // console.log('api called');
      setLoading(false);
    });
  }, []);
  const allExpenses = useSelector(state => state.expense.allExpenses);
  let previousExpenses = allExpenses.filter(
    singleExpense =>
      ExpenseController.dateSlicer(singleExpense.createdAt) != currentDate,
  );
  return {previousExpenses};
};
export const dateConverter = inputDate => {
  let date, month, year;
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  let result = `${year}-${month}-${date}`;
  return result.toString();
};

export const convertTodayDateTitle = (inputDate, onlyName) => {
  let date, month, year;
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  month = month.toString().padStart(2, '0');
  year = inputDate.getFullYear();
  let modifymonth = month => {
    switch (month) {
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May';
      case '06':
        return 'Jun';
      case '07':
        return 'Jul';
      case '08':
        return 'Aug';
      case '09':
        return 'Sep';
      case '10':
        return 'Oct';
      case '11':
        return 'Nov';
      case '12':
        return 'Dec';
      default:
        return;
    }
  };
  if (onlyName) {
    return `${modifymonth(month)}`;
  } else {
    return `${date}th\u0020${modifymonth(month)}`;
  }
};

export const getMonthName = month => {
  // console.log(month, '???');
  switch (month) {
    case '01':
      return 'Jan';
    case '02':
      return 'Feb';
    case '03':
      return 'Mar';
    case '04':
      return 'Apr';
    case '05':
      return 'May';
    case '06':
      return 'Jun';
    case '07':
      return 'Jul';
    case '08':
      return 'Aug';
    case '09':
      return 'Sep';
    case '10':
      return 'Oct';
    case '11':
      return 'Nov';
    case '12':
      return 'Dec';
    default:
      return month;
  }
};

export const useDateQuery = () => {
  return useSelector(state => state.expense.dateQuery);
};
export const convertPreviousDate = inputDate => {
  let date, month, year;
  date = inputDate.getDate() - 1;
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  let result = `${year}-${month}-${date}`;
  return result.toString();
};
export const getMinimumDate = inputDate => {
  let date, month, year;
  date = inputDate.getDate() - 10;
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  let result = `${year}-${month}-${date}`;
  return result.toString();
};
