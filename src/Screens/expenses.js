import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {lightThemeColors, Fonts} from '../theme';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
import {SheetManager} from 'react-native-actions-sheet';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import {useTheme} from '@react-navigation/native';
import SearchBar from '../Components/Module/searchBar';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import {dateConverter} from '../Controller/expenseController';
import DateRange from '../Components/Module/dateRange';
import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowDownIconSvg from '../Assets/Icons/arrowDownSvg';
import ExpensesBottomSheet from '../Components/Module/expensesBottomSheet';
import PieGraphV2 from '../Components/Module/pieGraph';
import AbstractModal from '../Components/Abstract/abstractModal';
import ContainerElement from '../Components/Abstract/containerElement';
import {useState, useEffect, useRef} from 'react';
import ThemeController from '../Controller/themeController';
import ExpenseController from '../Controller/expenseController';
import {useSelector} from 'react-redux';
import ArrowRightIconSvg from '../Assets/Icons/arrowRightsvg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AbstractNoData from '../Components/Abstract/abstractNoData';
import ReduxDispatchController from '../Controller/reduxDispatchController';
import {getMinimumDate} from '../Controller/expenseController';
const getDesiredWeek = (inputDate, type) => {
  let count;
  if (type == 'this') {
    count = 7;
  } else {
    count = 14;
  }
  let date, month, year;
  date = inputDate.getDate() - count;
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  month = month.toString().padStart(2, '0');
  let result = `${year}-${month}-${date}`;
  return result.toString();
};

const {height, width} = Dimensions.get('window');
const Expenses = ({route, navigation}) => {
  const allExpenses = useSelector(state => state.expense.allExpenses);
  const todayExpenses = useSelector(state => state.expense.todayExpenses);
  const thisWeekExp = useSelector(state => state.expense.thisWeek);
  const lastWeekExp = useSelector(state => state.expense.lastWeek);
  const dateRangeExp = useSelector(state => state.expense.dateRange);
  const categoryTitlesArray = useSelector(
    state => state.expense.expenseCategories,
  );

  const [thisWeek, setThisWeek] = useState(getDesiredWeek(new Date(), 'this'));
  const [LastWeek, setLastWeek] = useState(getDesiredWeek(new Date()), 'last');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');
  const [dateType, setDateType] = useState('start');
  const [startDate, setStartDate] = useState();
  const [input, setInput] = useState('');
  const [endDate, setEndDate] = useState();
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [sheetType, SetSheetType] = useState('reportDuration');
  const [type, SetType] = useState('all');
  const [search, SetSearch] = useState(false);
  const [searchedData, SetSearchData] = useState();
  const noOfPlaceHolders = [0, 0, 0];
  const expenseDetails = [
    {
      name: 'Salary Expenses',
      amount: 1200,
    },
    {
      name: 'supplies',
      amount: 3000,
    },
    {
      name: 'Office Expenses',
      amount: 5000,
    },
    {
      name: 'Other',
      amount: 3000,
    },
    {
      name: 'Inventory expenses',
      amount: 2000,
    },
    {
      name: 'Inventory expenses',
      amount: 8000,
    },
    {
      name: 'Salary Expenses',
      amount: 4000,
    },
    {
      name: 'supplies',
      amount: 3000,
    },
    {
      name: 'Office Expenses',
      amount: 5000,
    },
    {
      name: 'Other',
      amount: 3000,
    },
    {
      name: 'Inventory expenses',
      amount: 2000,
    },
    {
      name: 'Inventory expenses',
      amount: 8000,
    },
    {
      name: 'Salary Expenses',
      amount: 4000,
    },
    {
      name: 'supplies',
      amount: 3000,
    },
    {
      name: 'Office Expenses',
      amount: 5000,
    },
    {
      name: 'Other',
      amount: 3000,
    },
    {
      name: 'Inventory expenses',
      amount: 2000,
    },
    {
      name: 'Inventory expenses',
      amount: 8000,
    },
  ];

  const onPressSingleExpenseItem = item => {
    navigation.navigate('EntryDetails', {
      singleExpense: item,
      screenName: route.name,
    });
  };
  const filterCategoryTitle = cat_id => {
    const newArr = [...categoryTitlesArray];
    const newObj = newArr.find(item => item._id == cat_id);
    return newObj?.name;
  };
  useEffect(() => {
    ReduxDispatchController.Expense.updatedDateQueryInStore('toggle', false);
    if (filter == 'All') {
      setLoading(true);
      console.log('All');
      ExpenseController.findAllExpensesHandler(res => {
        console.log('response');
        setLoading(false);
      });
    } else if (filter == 'Today') {
      setLoading(true);
      console.log('today');
      ExpenseController.handletodayExpenseList(
        dateConverter(new Date()),
        res => {
          setLoading(false);
        },
      );
    } else if (filter == 'This Week') {
      setLoading(true);

      console.log('this week ?????', thisWeek);
      ExpenseController.handleFindExpenseByThisWeek(
        {sDate: dateConverter(new Date()), eDate: thisWeek},
        res => {
          setLoading(false);
        },
      );
    } else if (filter == 'Last Week') {
      setLoading(true);

      console.log('lst week ?????', lastWeekExp);
      ExpenseController.handleFindExpenseByLastWeek(
        {sDate: thisWeek, eDate: LastWeek},
        res => {
          setLoading(false);
        },
      );
    } else if (filter == 'By Date') {
      setLoading(true);

      console.log('By Date', lastWeekExp);
      ExpenseController.handleFindExpenseByLastWeek(
        {sDate: thisWeek, eDate: LastWeek},
        res => {
          setLoading(false);
        },
      );
    } else return;
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });

    if (input) {
      searchFilterFunction(input);
    }

    return () => {
      ThemeController.removingListener();
    };
  }, [filter]);

  useEffect(() => {
    if (startDate && endDate) {
      setFilter('By Date');
      setLoading(true);
      console.log('DateRange ?????', startDate, endDate, dateRangeExp);
      ExpenseController.handleFindExpenseByDateRange(
        {sDate: startDate, eDate: endDate},
        res => {
          setLoading(false);
        },
      );
    }
  }, [startDate, endDate]);
  const inputRef = useRef();
  const openExpensesBottomSheet = () => {
    inputRef.current.blur();
    setStartDate('');
    setEndDate('');
    SheetManager.show('expenses');
  };
  useEffect(() => {}, [allExpenses]);
  const onViewAllpress = () => {
    navigation.navigate('ShowAllExpenses', {viewAllType: type});
  };
  const onConfirmDate = inputDate => {
    if (dateType == 'start') {
      setStartDate(dateConverter(new Date(inputDate)));
    } else {
      setEndDate(dateConverter(new Date(inputDate)));
    }
    setOpen(false);
  };
  const handleStartDatePress = () => {
    setDateType('start');
    setOpen(true);
  };
  const handleEndDatePress = () => {
    setDateType('end');
    setOpen(true);
  };
  const filterTitle = title => {
    setFilter(title);
  };
  onSubmitText = () => {
    inputRef.current.blur();
  };
  const onFocus = () => {
    SetSearch(true);
  };
  const ExpenseDetailItemListPlacehlder = () => {
    return (
      <SkeletonPlaceholder
        borderRadius={4}
        backgroundColor={colors.white}
        highlightColor={'#F4f4f9'}
        speed={1200}>
        <SkeletonPlaceholder.Item alignItems="center">
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={26}
            marginBottom={5}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };
  const searchFilterFunction = txt => {
    setInput(txt);
    if (txt) {
      if (filter == 'All') {
        SetSearchData([]);
        const newData = allExpenses.filter(function (item) {
          const itemData = item.expenseName
            ? item.expenseName.toUpperCase()
            : ''.toUpperCase();
          const textData = txt.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length == 0) {
          const newDataByType = allExpenses.filter(function (item) {
            const itemData = item.expenseCategory
              ? filterCategoryTitle(item.expenseCategory).toUpperCase()
              : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          SetSearchData(newDataByType);
        } else {
          SetSearchData(newData);
        }
      } else if (filter == 'Today') {
        SetSearchData([]);

        const newData = todayExpenses.filter(function (item) {
          const itemData = item.expenseName
            ? item.expenseName.toUpperCase()
            : ''.toUpperCase();
          const textData = txt.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length == 0) {
          const newDataByType = todayExpenses.filter(function (item) {
            const itemData = item.expenseCategory
              ? filterCategoryTitle(item.expenseCategory).toUpperCase()
              : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          SetSearchData(newDataByType);
        } else {
          SetSearchData(newData);
        }
      } else if (filter == 'This Week') {
        SetSearchData([]);

        const newData = thisWeekExp.filter(function (item) {
          const itemData = item.expenseName
            ? item.expenseName.toUpperCase()
            : ''.toUpperCase();
          const textData = txt.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length == 0) {
          const newDataByType = thisWeekExp.filter(function (item) {
            const itemData = item.expenseCategory
              ? filterCategoryTitle(item.expenseCategory).toUpperCase()
              : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          SetSearchData(newDataByType);
        } else {
          SetSearchData(newData);
        }
      } else if (filter == 'Last Week') {
        SetSearchData([]);
        const newData = lastWeekExp.filter(function (item) {
          const itemData = item.expenseName
            ? item.expenseName.toUpperCase()
            : ''.toUpperCase();
          const textData = txt.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length == 0) {
          const newDataByType = lastWeekExp.filter(function (item) {
            const itemData = item.expenseCategory
              ? filterCategoryTitle(item.expenseCategory).toUpperCase()
              : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          SetSearchData(newDataByType);
        } else {
          SetSearchData(newData);
        }
      } else if (filter == 'By Date') {
        SetSearchData([]);
        const newData = dateRangeExp.filter(function (item) {
          const itemData = item.expenseName
            ? item.expenseName.toUpperCase()
            : ''.toUpperCase();
          const textData = txt.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        if (newData.length == 0) {
          const newDataByType = dateRangeExp.filter(function (item) {
            const itemData = item.expenseCategory
              ? filterCategoryTitle(item.expenseCategory).toUpperCase()
              : ''.toUpperCase();
            const textData = txt.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          SetSearchData(newDataByType);
        } else {
          SetSearchData(newData);
        }
      }
    }
  };
  console.log('dddd????', getMinimumDate(new Date()));
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={colors.darkBlue}
      />
      <View
        style={[
          styles.headerContainer,
          {paddingTop: 10, backgroundColor: colors.darkBlue},
        ]}>
        <AbstractHeader
          height={height * 0.09}
          backgroundColor={'transparent'}
          renderMiddleItem={() => (
            <View
              style={{
                height: '80%',
                width: '100%',
                // backgroundColor: 'tomato',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={styles.sugesstionHeading}>Expenses</Text>
            </View>
          )}
        />
        <DateRange
          onEndDatePress={handleEndDatePress}
          onStartDatePress={handleStartDatePress}
          startDate={startDate}
          endDate={endDate}
        />
        <View style={{marginTop: 16}}>
          <SearchBar
            onSubmitEditing={onSubmitText}
            inputRef={inputRef}
            onFocus={onFocus}
            expenses={true}
            renderIconRight={() => (
              <TouchableOpacity
                onPress={() => openExpensesBottomSheet()}
                style={{
                  position: 'absolute',
                  right: 0,
                  height: height * 0.06,
                  minwidth: 90,
                  borderTopRightRadius: 35,
                  borderBottomRightRadius: 35,
                  flexDirection: 'row',
                  backgroundColor: lightThemeColors.red1,
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingRight: 12,
                  justifyContent: 'space-around',
                }}>
                <Text
                  style={[
                    styles.sugesstionHeading,
                    {marginRight: 20, fontSize: 14},
                  ]}>
                  {filter}
                </Text>
                <ArrowDownIconSvg height={9} width={14} />
              </TouchableOpacity>
            )}
            Value={input}
            onChangeText={e => {
              searchFilterFunction(e);
            }}
            searchBarPlaceHolder={'Search with name, type'}
            searchBarplaceholderTextColor={colors.grey1}
          />
        </View>
      </View>
      <View style={styles.horizontalContainer}>
        <ExpenseDetailHeader height={24} backgroundColor={'transparent'} />
      </View>
      {input ? (
        <>
          <View style={[styles.middleContainer, {paddingHorizontal: 20}]}>
            {loading ? (
              <>
                {noOfPlaceHolders.map((item, index) => (
                  <ExpenseDetailItemListPlacehlder key={index} />
                ))}
              </>
            ) : (
              <>
                {searchedData != 0 ? (
                  <FlatList
                    contentContainerStyle={{paddingBottom: 20}}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    data={searchedData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                      return (
                        <ExpenseDetailItem
                          key={index}
                          item={item}
                          onPress={item => onPressSingleExpenseItem(item)}
                        />
                      );
                    }}
                  />
                ) : (
                  <View
                    style={[
                      styles.middleContainer,
                      {justifyContent: 'center'},
                    ]}>
                    <AbstractNoData
                      caption={"Sorry we couldn't find any results! "}
                    />
                  </View>
                )}
              </>
            )}
          </View>
        </>
      ) : (
        <>
          {startDate && endDate ? (
            <>
              <View style={[styles.middleContainer, {paddingHorizontal: 20}]}>
                {loading ? (
                  <>
                    {noOfPlaceHolders.map((item, index) => (
                      <ExpenseDetailItemListPlacehlder key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {dateRangeExp != 0 ? (
                      <FlatList
                        contentContainerStyle={{paddingBottom: 20}}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        data={dateRangeExp}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          return (
                            <ExpenseDetailItem
                              key={index}
                              item={item}
                              onPress={item => onPressSingleExpenseItem(item)}
                            />
                          );
                        }}
                      />
                    ) : (
                      <View
                        style={[
                          styles.middleContainer,
                          {justifyContent: 'center'},
                        ]}>
                        <AbstractNoData
                          caption={"Sorry we couldn't find any results! "}
                        />
                      </View>
                    )}
                  </>
                )}
              </View>
            </>
          ) : (
            <>
              {filter == 'All' ? (
                <>
                  <View style={[styles.middleContainer]}>
                    <ScrollView
                      bounces={false}
                      showsVerticalScrollIndicator={false}>
                      <ContainerElement>
                        {loading ? (
                          <>
                            {noOfPlaceHolders.map((item, index) => (
                              <ExpenseDetailItemListPlacehlder key={index} />
                            ))}
                            <SkeletonPlaceholder
                              borderRadius={4}
                              backgroundColor={colors.white}
                              highlightColor={'#F4f4f9'}
                              speed={1200}>
                              <View
                                style={{
                                  height: 28,
                                  width: 69,
                                  backgroundColor: 'green',
                                  alignSelf: 'flex-end',
                                }}></View>
                            </SkeletonPlaceholder>
                          </>
                        ) : (
                          <>
                            {allExpenses?.length != 0 ? (
                              <>
                                {allExpenses.slice(0, 3)?.map((item, index) => {
                                  return (
                                    <ExpenseDetailItem
                                      key={index}
                                      item={item}
                                      onPress={item =>
                                        onPressSingleExpenseItem(item)
                                      }
                                    />
                                  );
                                })}
                                {allExpenses.length >= 3 ? (
                                  <View
                                    style={{
                                      width: '100%',
                                      alignItems: 'flex-end',
                                    }}>
                                    <AbstractButton
                                      backgroundColor={colors.white}
                                      height={32}
                                      title={'View All'}
                                      titleStyle={{
                                        color: lightThemeColors.red1,
                                        fontFamily: Fonts.interBold,
                                        fontWeight: '500',
                                        fontSize: 10,
                                      }}
                                      renderRightIcon={() => (
                                        <View style={{flexDirection: 'row'}}>
                                          <ArrowRightIconSvg />
                                          <ArrowRightIconSvg />
                                        </View>
                                      )}
                                      iconMargin={3.5}
                                      width={69}
                                      borderRadius={5}
                                      onPress={onViewAllpress}
                                    />
                                  </View>
                                ) : null}
                              </>
                            ) : (
                              <View
                                style={[
                                  styles.middleContainer,
                                  {justifyContent: 'center'},
                                ]}>
                                <AbstractNoData
                                  caption={
                                    "Sorry we couldn't find any all expenses! "
                                  }
                                />
                              </View>
                            )}
                          </>
                        )}

                        <View
                          style={{
                            justifyContent: 'center',
                            // backgroundColor: 'green',
                            paddingRight: 80,
                          }}>
                          <PieGraphV2 data={expenseDetails} loading={loading} />

                          <AbstractModal isVisible={modalVisible}>
                            <View
                              style={{
                                height: 100,
                                width: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <AbstractButton
                                title={'close'}
                                onPress={() => setModalVisible(false)}
                              />
                              <Text>{modalData?.label}</Text>
                            </View>
                          </AbstractModal>
                        </View>
                      </ContainerElement>
                    </ScrollView>
                  </View>
                </>
              ) : filter == 'Today' ? (
                <>
                  <View
                    style={[styles.middleContainer, {paddingHorizontal: 20}]}>
                    {loading ? (
                      <>
                        {noOfPlaceHolders.map((item, index) => (
                          <ExpenseDetailItemListPlacehlder key={index} />
                        ))}
                      </>
                    ) : (
                      <>
                        {todayExpenses != 0 ? (
                          <FlatList
                            contentContainerStyle={{paddingBottom: 20}}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            data={todayExpenses}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <ExpenseDetailItem
                                  key={index}
                                  item={item}
                                  onPress={item =>
                                    onPressSingleExpenseItem(item)
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          <View
                            style={[
                              styles.middleContainer,
                              {justifyContent: 'center'},
                            ]}>
                            <AbstractNoData
                              caption={
                                "Sorry we couldn't find any today expenses! "
                              }
                            />
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </>
              ) : filter == 'This Week' ? (
                <>
                  <View
                    style={[styles.middleContainer, {paddingHorizontal: 20}]}>
                    {loading ? (
                      <>
                        {noOfPlaceHolders.map((item, index) => (
                          <ExpenseDetailItemListPlacehlder key={index} />
                        ))}
                      </>
                    ) : (
                      <>
                        {thisWeekExp != 0 ? (
                          <FlatList
                            contentContainerStyle={{paddingBottom: 20}}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            data={thisWeekExp}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <ExpenseDetailItem
                                  key={index}
                                  item={item}
                                  onPress={item =>
                                    onPressSingleExpenseItem(item)
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          <View
                            style={[
                              styles.middleContainer,
                              {justifyContent: 'center'},
                            ]}>
                            <AbstractNoData
                              caption={"Sorry we couldn't find any results! "}
                            />
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </>
              ) : filter == 'Last Week' ? (
                <>
                  <View
                    style={[styles.middleContainer, {paddingHorizontal: 20}]}>
                    {loading ? (
                      <>
                        {noOfPlaceHolders.map((item, index) => (
                          <ExpenseDetailItemListPlacehlder key={index} />
                        ))}
                      </>
                    ) : (
                      <>
                        {lastWeekExp != 0 ? (
                          <FlatList
                            contentContainerStyle={{paddingBottom: 20}}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            data={lastWeekExp}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item, index}) => {
                              return (
                                <ExpenseDetailItem
                                  key={index}
                                  item={item}
                                  onPress={item =>
                                    onPressSingleExpenseItem(item)
                                  }
                                />
                              );
                            }}
                          />
                        ) : (
                          <View
                            style={[
                              styles.middleContainer,
                              {justifyContent: 'center'},
                            ]}>
                            <AbstractNoData
                              caption={"Sorry we couldn't find any results! "}
                            />
                          </View>
                        )}
                      </>
                    )}
                  </View>
                </>
              ) : null}
            </>
          )}
        </>
      )}

      <ExpensesBottomSheet
        id={'expenses'}
        // onPress={closeExpensesBottomSheet}
        reportType={sheetType}
        setReportType={SetSheetType}
        onPress={title => filterTitle(title)}
      />
      <DatePicker
        // minimumDate={new Date(getMinimumDate(new Date()))}
        maximumDate={new Date()}
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={date => onConfirmDate(date)}
        onCancel={() => {
          setOpen(false);
        }}
        theme={darkMode ? 'dark' : 'light'}
      />
    </View>
  );
};

export default Expenses;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.black1,
    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },
  headerContainer: {
    height: height * 0.27,
    backgroundColor: lightThemeColors.darkBlue,
    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    // paddingTop: 20,
    flex: 0.86,
    width: '100%',
    // backgroundColor: 'green',
  },
  horizontalContainer: {
    height: 40,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  sugesstionHeading: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 20,
    color: lightThemeColors.white,
  },
});
