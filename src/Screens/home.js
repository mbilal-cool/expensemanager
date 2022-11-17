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
import ExpenseController from '../Controller/expenseController';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import HeaderDropDown from '../Components/Module/headerDropDown';
import SearchBar from '../Components/Module/searchBar';
import ExpenseInfoCard from '../Components/Module/expenseInfoCard';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import HomeBottomSheet from '../Components/Module/homeBottomSheet';
const {height, width} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Fonts, lightThemeColors} from '../theme';
import {useSelector} from 'react-redux';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowRightIconSvg from '../Assets/Icons/arrowRightsvg';
const ExpenseDetailItemListPlacehlder = ({showAllButton}) => {
  const {colors} = useTheme();
  return (
    <SkeletonPlaceholder
      borderRadius={4}
      backgroundColor={colors.white}
      highlightColor={'#F4f4f9'}
      speed={1200}>
      <SkeletonPlaceholder.Item alignItems="center">
        <SkeletonPlaceholder.Item width={'100%'} height={26} marginBottom={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const convertDate = inputDate => {
  let date, month, year;
  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');

  month = month.toString().padStart(2, '0');

  let result = `${year}-${month}-${date}`;
  return result.toString();
};
const convertPreviousDate = inputDate => {
  let date, month, year;
  date = inputDate.getDate() - 1;
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();
  date = date.toString().padStart(2, '0');

  month = month.toString().padStart(2, '0');

  let result = `${year}-${month}-${date}`;
  return result.toString();
};
const Home = ({route, navigation}) => {
  const todayExpenses = useSelector(state => state.expense.todayExpenses);
  const previousDayExpenses = useSelector(
    state => state.expense.previousdayExpenses,
  );
  // console.log('today expenses', todayExpenses);
  const [expenseList, SetExpenseList] = useState();

  const [loading, setLoading] = useState(true);
  const noOfPlaceHolders = [0, 0, 0];
  const [todayDate, SetTodayDate] = useState();
  const [currentDate, setCurrentDate] = useState(convertDate(new Date()));
  const [previousDate, setPreviousDate] = useState(
    convertPreviousDate(new Date()),
  );

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
    ExpenseController.handlegetExpenseCategories(res => {
      console.log('categories response');
    });
    SetTodayDate(convertTodayDateTitle(new Date()));
    ExpenseController.handletodayExpenseList(currentDate, res => {
      setLoading(res);
    });
    ExpenseController.handlePreviousDayExpenseList(previousDate, res => {
      setLoading(res);
    });
  }, []);
  const onPressSingleExpenseItem = item => {
    navigation.navigate('EntryDetails', {
      singleExpense: item,
      screenName: route.name,
    });
  };
  const onFocusSearchInput = () => {
    navigation.navigate('Search');
  };
  const openHomeBottomSheet = () => {
    setSheetType('selectDate');
    SheetManager.show('Home');
  };
  const onViewAllpressToday = () => {
    navigation.navigate('ShowAllExpenses', {viewAllType: 'today'});
  };
  const onViewAllPressPrevious = () => {
    navigation.navigate('ShowAllExpenses', {viewAllType: 'previous'});
  };
  const handleOnpress = id => {
    navigation.navigate('EntryDetails', {id});
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
        <ScrollView showsVerticalScrollIndicator={false} bounce={false}>
          <ExpenseDetailHeader
            height={50}
            headingMain={'Today'}
            currentDate={todayDate}
            backgroundColor={'transparent'}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
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
                {todayExpenses.slice(0, 3)?.map((item, index) => {
                  return (
                    <ExpenseDetailItem
                      key={index}
                      item={item}
                      onPress={item => onPressSingleExpenseItem(item)}
                    />
                  );
                })}
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
                    onPress={onViewAllpressToday}
                  />
                </View>
              </>
            )}
          </View>

          <ExpenseDetailHeader
            height={50}
            headingMain={'Previous'}
            backgroundColor={'transparent'}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
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
                {previousDayExpenses.slice(0, 3)?.map((item, index) => {
                  return (
                    <ExpenseDetailItem
                      key={index}
                      item={item}
                      onPress={item => onPressSingleExpenseItem(item)}
                    />
                  );
                })}
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
                    onPress={onViewAllPressPrevious}
                  />
                </View>
              </>
            )}
          </View>
        </ScrollView>
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
