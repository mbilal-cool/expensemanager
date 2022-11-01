import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {SheetManager} from 'react-native-actions-sheet';
import ExpenseDetailItemList from '../Components/Module/expenseDetailItemList';
import ExpenseController from '../Controller/expenseController';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import HeaderDropDown from '../Components/Module/headerDropDown';
import SearchBar from '../Components/Module/searchBar';
import ExpenseInfoCard from '../Components/Module/expenseInfoCard';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import HomeBottomSheet from '../Components/Module/homeBottomSheet';
const {height, width} = Dimensions.get('window');

import {Fonts, lightThemeColors} from '../theme';
import {useSelector} from 'react-redux';
const convertDate = inputDate => {
  let date, month, year;
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');
  year = year.toString().substr(2, 3);
  month = month.toString().padStart(2, '0');

  let result = `${date}/${month}/${year}`;
  return result.toString();
};
const Home = ({navigation}) => {
  const expenses = useSelector(state => state.expense.expenses);

  const [todayDate, SetTodayDate] = useState();
  const [currentDate, setCurrentDate] = useState(convertDate(new Date()));

  const {colors} = useTheme();
  const [date, setDate] = useState({
    month: 'May',
    year: 2022,
    suggestedYear: 2022,
  });
  const [sheetType, setSheetType] = useState('selectDate');

  const convertTodayDateTitle = inputDate => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;

    date = date.toString().padStart(2, '0');

    month = month.toString().padStart(2, '0');
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
    return `${date}th\u0020${modifymonth(month)}`;
  };
  useEffect(() => {
    SetTodayDate(convertTodayDateTitle(new Date()));
  }, []);

  const onFocusSearchInput = () => {
    navigation.navigate('Search');
  };
  const openHomeBottomSheet = () => {
    setSheetType('selectDate');
    SheetManager.show('Home');
  };

  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor={colors.darkBlue}
      />
      <View
        style={[styles.headerContainer, {backgroundColor: colors.darkBlue}]}>
        <AbstractHeader
          height={height * 0.08}
          backgroundColor={'transparent'}
          renderMiddleItem={() => (
            <View
              style={{
                height: '80%',
                width: '100%',

                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <HeaderDropDown onPress={openHomeBottomSheet} title={date} />
            </View>
          )}
        />
        <TouchableOpacity onPress={onFocusSearchInput}>
          <SearchBar
            mimic={true}
            searchBarplaceholderTextColor={colors.grey1}
            searchBarPlaceHolder={'Search or add expense from catalog...'}
          />
        </TouchableOpacity>
        <ExpenseInfoCard />
      </View>

      <View style={styles.middleContainer}>
        <View
          style={[styles.horizontalContainer, {zIndex: -1, height: 97}]}></View>
        {/* {todayDataAvailable && prevDataAvailbele ? (
          <ActivityIndicator size="large" color={colors.red1} />
        ) : ( */}

        <ExpenseDetailHeader
          height={50}
          headingMain={'Today'}
          currentDate={todayDate}
          backgroundColor={'transparent'}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <ExpenseDetailItemList
            noOfPlaceHolders={[0, 0, 0]}
            date={currentDate}
            borderRadius={6}
            marginBottom={5}
            showAllButton={true}
            navigation={navigation}
          />
        </View>

        <ExpenseDetailHeader
          height={50}
          headingMain={'Previous'}
          backgroundColor={'transparent'}
        />
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <ExpenseDetailItemList
            noOfPlaceHolders={[0, 0, 0]}
            date={'31/10/22'}
            borderRadius={6}
            marginBottom={5}
            navigation={navigation}
            showAllButton={true}
          />
        </View>

        {/* )} */}
      </View>

      <HomeBottomSheet
        id={'Home'}
        type={sheetType}
        setType={setSheetType}
        Date={date}
        setDate={setDate}
        buttontitle={'Add New'}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  headerContainer: {
    height: height * 0.27,

    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 0.8661,
    width: '100%',
    // backgroundColor: 'red',
  },
  horizontalContainer: {
    height: 57,

    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
