import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../theme';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import SearchBar from '../Components/Module/searchBar';
import {expenseTypes} from '../mockData';
import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import {SheetManager} from 'react-native-actions-sheet';
import ExpenseTypesList from '../Components/Module/expenseTypesList';
import AbstractNoData from '../Components/Abstract/abstractNoData';
import ThemeController from '../Controller/themeController';
import HomeBottomSheet from '../Components/Module/homeBottomSheet';
import ExpenseController from '../Controller/expenseController';
const ExpenseType = ({route, navigation}) => {
  const {type, screenName, editExpense} = route.params ? route.params : '';
  console.log('type in expence type:', type, screenName);
  const {colors} = useTheme();
  const [types, SetTypes] = useState(expenseTypes);
  const [darkMode, setDarkMode] = useState(expenseTypes);
  const [sheetType, setSheetType] = useState('addExpenseType');
  const onAddTypePressed = type => {
    ExpenseController.addExpenseCategories(type, call_back => {
      console.log('add categories response', call_back);
    });
  };

  const openHomeBottomSheet = () => {
    setSheetType('addExpenseType');
    SheetManager.show('etype');
  };
  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const handleExpenseTypePressed = item => {
    navigation.navigate(screenName, {
      expensCategoryItem: item,
      type,
      editExpense,
    });
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={colors.defaultBackground}
      />

      <AbstractHeader
        backgroundColor={'transparent'}
        renderMiddleItem={() => (
          <View
            style={{
              width: '100%',
              height: '100%',
              //   backgroundColor: 'green',
              justifyContent: 'flex-end',
              paddingBottom: 15,
              alignItems: 'center',
            }}>
            <Text style={[styles.titleStyle, {color: colors.black}]}>
              Expense Type
            </Text>
          </View>
        )}
        renderLeftItem={() => (
          <TouchableOpacity
            onPress={() => handleLeftArrowPressed()}
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'green',
              justifyContent: 'flex-end',
              //   alignItems: 'center',
              paddingBottom: 20,
              paddingHorizontal: 20,
            }}>
            <ArrowLeftTailSvg color={colors.black} />
          </TouchableOpacity>
        )}
      />

      {types == '' ? (
        <View style={[styles.middleContainer]}>
          <View>
            <SearchBar
              searchBarPlaceHolder={'Search expanse type'}
              searchBarplaceholderTextColor={colors.grey1}
              backgroundColor={colors.white}
              borderWidth={1}
              borderColor={colors.grey2}
            />
          </View>
          <AbstractNoData
            caption={'No Expense Added'}
            caption1={'hello my levo'}
          />
          <View>
            <AbstractButton
              backgroundColor={lightThemeColors.red1}
              height={50}
              title={'Add New'}
              titleStyle={{
                color: colors.white,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              width={'100%'}
              borderRadius={30}
              onPress={openHomeBottomSheet}
            />
          </View>
        </View>
      ) : (
        <View style={styles.middleContainer}>
          <View>
            <SearchBar
              searchBarPlaceHolder={'Search expanse type'}
              searchBarplaceholderTextColor={colors.grey1}
              backgroundColor={colors.white}
              borderWidth={1}
              borderColor={colors.grey2}
            />
            <View style={styles.horizontalContainer}>
              <Text style={styles.sugesstionHeading}>
                Already added Expense Type
              </Text>
            </View>
            <ExpenseTypesList
              onPress={item => handleExpenseTypePressed(item)}
            />
          </View>
          <View>
            <AbstractButton
              backgroundColor={lightThemeColors.red1}
              height={50}
              title={'Add New'}
              titleStyle={{
                color: colors.white,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              iconMargin={10}
              width={'100%'}
              borderRadius={30}
              onPress={openHomeBottomSheet}
            />
          </View>
        </View>
      )}
      <HomeBottomSheet
        id={'etype'}
        type={sheetType}
        setType={setSheetType}
        buttontitle={'Add'}
        onPress={type => onAddTypePressed(type)}
      />
    </View>
  );
};

export default ExpenseType;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },

  middleContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'green',
    zIndex: -1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  horizontalContainer: {
    height: 50,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  sugesstionHeading: {
    fontFamily: Fonts.interItalic,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey1,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 20,
    color: lightThemeColors.black,
  },
});
