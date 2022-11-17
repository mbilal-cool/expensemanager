import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SearchSugesstionItem from '../Components/Module/searchSuggestionitem';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../theme';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import SearchBar from '../Components/Module/searchBar';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import {expenseList} from '../mockData';
import AbstractButton from '../Components/Abstract/abstractButton';
import PlusIconSvg from '../Assets/Icons/plusSvg';
import SearchResultItem from '../Components/Module/searchResultItem';
import ArrowDownIconSvg from '../Assets/Icons/arrowDownSvg';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import ArrowUpIconSvg from '../Assets/Icons/BottomTabSvgs/arrowUpSvg';
import ThemeController from '../Controller/themeController';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
import ArrowRightIconSvg from '../Assets/Icons/arrowRightsvg';
import ExpenseController, {
  useFilteredMostRecent,
} from '../Controller/expenseController';
const {height, width} = Dimensions.get('window');
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
const Search = ({route, navigation}) => {
  const {allExpenses, loading} = useFilteredMostRecent(convertDate(new Date()));

  const {colors} = useTheme();

  const [searchDropDown, setSearchDropDown] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const [noOfPlaceHolders, setNoOfPlaceHolders] = useState([0, 0, 0, 0, 0, 0]);
  const [input, setInput] = useState('');
  useEffect(() => {
    // ExpenseController.findAllExpensesHandler(res => {
    //   console.log('response');
    //   let filtered = allExpenses.filter(
    //     singleExpense =>
    //       ExpenseController.dateSlicer(singleExpense.createdAt) == currentDate,
    //   );
    //   SetAllreadyAddedExpenses(filtered);
    //   // console.log(
    //   //   'filtered: ',
    //   //   filtered,
    //   //   'all expensssss',
    //   //   currentDate,
    //   //   allExpenses,
    //   // );
    //   setLoading(false);
    // });

    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const onPressSingleExpenseItem = item => {
    navigation.navigate('EntryDetails', {
      singleExpense: item,
      screenName: route.name,
    });
  };
  const addOneTimePresss = () => {
    navigation.navigate('OneTimeExpense', {type: 'add'});
  };
  const addRecurringPress = () => {
    navigation.navigate('RecurringExpense', {
      type: 'add',
    });
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  const onViewAllpress = () => {
    navigation.navigate('ShowAllExpenses');
  };
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={'light-content'}
        translucent={true}
        backgroundColor={colors.darkBlue}
      />
      <View
        style={[styles.headerContainer, {backgroundColor: colors.darkBlue}]}>
        <AbstractHeader
          height={height * 0.08}
          backgroundColor={'transparent'}
          renderLeftItem={() => (
            <TouchableOpacity
              onPress={() => handleLeftArrowPressed()}
              style={{
                width: '100%',
                height: '100%',
                // backgroundColor: 'green',
                justifyContent: 'flex-end',
                paddingBottom: 13,
              }}>
              <ArrowLeftTailSvg color={lightThemeColors.white} />
            </TouchableOpacity>
          )}
        />
        <SearchBar
          renderIconRight={() => (
            <TouchableOpacity
              onPress={() => setSearchDropDown(!searchDropDown)}
              style={{
                position: 'absolute',
                right: 0,
                height: height * 0.06,
                width: 50,
                borderTopRightRadius: 35,
                borderBottomRightRadius: 35,

                backgroundColor: lightThemeColors.red1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {searchDropDown ? (
                <ArrowUpIconSvg color={colors.white} />
              ) : (
                <ArrowDownIconSvg width={12} height={6} color={colors.white} />
              )}
            </TouchableOpacity>
          )}
          Value={input}
          onChangeText={setInput}

          //   onFocus={setFocusSearch}
        />
        {searchDropDown ? <SearchSugesstionItem /> : null}

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            height: '32%',
            alignItems: 'flex-end',
            zIndex: -1,
            // backgroundColor: 'green',
          }}>
          <AbstractButton
            backgroundColor={lightThemeColors.red1}
            height={height * 0.05}
            title={'Onetime Expanse'}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 12,
              zIndex: -1,
            }}
            iconMargin={10}
            width={'48%'}
            borderRadius={30}
            onPress={addOneTimePresss}
            renderRightIcon={() => (
              <PlusIconSvg
                width={height * 0.015}
                height={height * 0.015}
                color={colors.white}
              />
            )}
          />
          <AbstractButton
            borderWidth={1}
            borderColor={lightThemeColors.white}
            backgroundColor={'transparent'}
            height={height * 0.05}
            title={'Recurring Expanse'}
            titleStyle={{
              color: lightThemeColors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 12,
            }}
            iconMargin={10}
            width={'48%'}
            borderRadius={30}
            onPress={addRecurringPress}
            renderRightIcon={() => (
              <PlusIconSvg
                width={height * 0.015}
                height={height * 0.015}
                color={colors.white}
              />
            )}
          />
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={[styles.horizontalContainer]}>
          <Text style={styles.sugesstionHeading}>
            Search results from catalog
          </Text>
        </View>

        <View style={{paddingHorizontal: 20}}>
          <SearchResultItem />
          <SearchResultItem />
          <SearchResultItem />
        </View>
        <View style={[styles.horizontalContainer]}>
          <Text style={styles.sugesstionHeading}>Already added Expense</Text>
        </View>
        <ExpenseDetailHeader backgroundColor={'transparent'} />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            // backgroundColor: 'green',
          }}>
          {loading ? (
            <>
              {noOfPlaceHolders.map((item, index) => (
                <ExpenseDetailItemListPlacehlder key={index} />
              ))}
            </>
          ) : (
            <>
              {allExpenses.slice(0, 7)?.map((item, index) => {
                return (
                  <ExpenseDetailItem
                    key={index}
                    item={item}
                    // onPress={item => onPressSingleExpenseItem(item)}
                  />
                );
              })}
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    zIndex: 0,
  },
  headerContainer: {
    height: height * 0.23,
    // backgroundColor: lightThemeColors.darkBlue,
    // backgroundColor: 'green',
    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
    zIndex: -1,
    paddingBottom: 10,
  },
  horizontalContainer: {
    height: 57,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  sugesstionHeading: {
    fontFamily: Fonts.interItalic,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey,
  },
});
