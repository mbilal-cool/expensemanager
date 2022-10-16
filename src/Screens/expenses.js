import {
  Dimensions,
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
import {expenseList} from '../mockData';
import DateRange from '../Components/Module/dateRange';

import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowRightIconSvg from '../Assets/Icons/arrowRightsvg';

import ArrowDownIconSvg from '../Assets/Icons/arrowDownSvg';

import ExpensesBottomSheet from '../Components/Module/expensesBottomSheet';

import PieGraphV2 from '../Components/Module/pieGraph';
import AbstractModal from '../Components/Abstract/abstractModal';
import ContainerElement from '../Components/Abstract/containerElement';
import {useState, useEffect} from 'react';
import ThemeController from '../Controller/themeController';
const {height, width} = Dimensions.get('window');

const Expenses = ({navigation}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');
  const [dateType, setDateType] = useState('start');
  const [startDate, setStartDate] = useState('Start Date');
  const [endDate, setEndDate] = useState('End Date');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {colors} = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [sheetType, SetSheetType] = useState('reportDuration');

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
  const onPressSector = (value, selectedSectorData) => {
    setModalData(selectedSectorData);
  };

  const [expenses, SetExpenses] = useState(expenseList);
  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const openExpensesBottomSheet = () => {
    SheetManager.show('expenses');
  };
  const onViewAllpress = () => {
    navigation.navigate('ShowAllExpenses');
  };
  const closeExpensesBottomSheet = () => {
    SheetManager.hide('expenses');
    navigation.navigate('EntryDetails');
  };
  const handleEntryDeatilPressed = () => {
    navigation.navigate('EntryDetails');
  };

  const convertDate = inputDate => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date.toString().padStart(2, '0');
    year = year.toString().substr(2, 3);
    month = month.toString().padStart(2, '0');

    let result = `${date}/${month}/${year}`;
    dateType == 'start' ? setStartDate(result) : setEndDate(result);
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
                  paddingRight: 10,
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
            // Value={input}
            // onChangeText={setInput}
            searchBarPlaceHolder={'Search with name, type'}
            searchBarplaceholderTextColor={colors.grey1}
          />
        </View>
      </View>
      <View style={styles.horizontalContainer}>
        <ExpenseDetailHeader height={24} backgroundColor={'transparent'} />
      </View>
      <View
        style={[
          styles.middleContainer,
          // {backgroundColor: colors.defaultBackground},
        ]}>
        <ContainerElement>
          <ScrollView style={{}} showsVerticalScrollIndicator={false}>
            <ExpenseDetailItem
              onPress={handleEntryDeatilPressed}
              expensesList={expenses}
              borderRadius={6}
              marginBottom={5}
            />
            <View style={{width: '100%', alignItems: 'flex-end'}}>
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
            <View
              style={{
                justifyContent: 'center',
                // backgroundColor: 'yellow',
                paddingRight: 100,
              }}>
              <PieGraphV2 onPressSector={onPressSector} data={expenseDetails} />

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
          </ScrollView>
        </ContainerElement>
      </View>
      <ExpensesBottomSheet
        id={'expenses'}
        // onPress={closeExpensesBottomSheet}
        reportType={sheetType}
        setReportType={SetSheetType}
        onPress={title => filterTitle(title)}
      />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          convertDate(new Date(date));
          setOpen(false);
          setDate(date);
        }}
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
