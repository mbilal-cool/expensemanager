import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import DatePicker from 'react-native-date-picker';

import {lightThemeColors, Fonts} from '../theme';

import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';

import AbstractButton from '../Components/Abstract/abstractButton';

import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import ExpenseDateTile from '../Components/Module/expenseDateTile';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
import AllExpensesIconSvg from '../Assets/Icons/BottomTabSvgs/allExpensesSvg';
import PaymentDetailMethod from '../Components/Module/paymentDetailMethod';
import ClipBoardIconSvg from '../Assets/Icons/clipboardSvg';

import ExpenseTypeTile from '../Components/Module/expenseTypeTile';

import {useTheme} from '@react-navigation/native';
import ThemeController from '../Controller/themeController';
const {height, width} = Dimensions.get('window');
const OneTimeExpense = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('05,May,2022');
  const [darkMode, setDarkMode] = useState(false);
  const {colors} = useTheme();

  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const handleExpenseTypePressed = () => {
    navigation.navigate('ExpenseType');
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  const convertDate = inputDate => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date.toString().padStart(2, '0');

    month.toString().padStart(2, '0');

    const modifiedMonth = month => {
      switch (month) {
        case 1:
          return 'Jan';
        case 2:
          return 'Feb';
        case 3:
          return 'Mar';
        case 4:
          return 'Apr';
        case 5:
          return 'May';
        case 6:
          return 'Jun';
        case 7:
          return 'Jul';
        case 8:
          return 'Aug';
        case 9:
          return 'Sep';
        case 10:
          return 'Oct';
        case 11:
          return 'Nov';
        case 12:
          return 'Dec';
        default:
          return;
      }
    };

    let result = `${date} \u0020${modifiedMonth(month)}, \u0020${year}`;
    setSelectedDate(result);
  };
  const handleDatePress = () => {
    setOpen(true);
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
              Ontime Expense
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

      <View style={styles.middleContainer}>
        <View
          style={[
            styles.horizontalContainer,
            {
              // backgroundColor: colors.white
              // backgroundColor: 'tomato',
            },
          ]}>
          <AbstractTextInput
            backgroundColor={'transparent'}
            borderBottomWidth={1}
            borderColor={colors.grey2}
            Label={'Amount'}
            PlaceHolder={'3500'}
            placeholderTextColor={colors.black}
            renderInputIcon={() => (
              <View
                style={{
                  height: 17,
                  width: 15,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: lightThemeColors.grey,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <Text
                    style={[
                      styles.titleStyle,
                      {color: colors.black, fontSize: 10},
                    ]}>
                    $
                  </Text>
                </View>
              </View>
            )}
            alignIcon={'flex-end'}
          />
          <AbstractTextInput
            backgroundColor={'transparent'}
            borderBottomWidth={1}
            borderColor={colors.grey2}
            Label={'Expense Name'}
            PlaceHolder={'Office Maintainence'}
            placeholderTextColor={colors.black}
            renderLabelIcon={() => (
              <AllExpensesIconSvg width={15} height={12} />
            )}
          />
          <ExpenseTypeTile
            backgroundColor={'transparent'}
            borderBottomWidth={1}
            Label={'ExpenseType'}
            placeHolder={'Office Expense'}
            borderColor={colors.grey2}
            onPress={handleExpenseTypePressed}
          />

          <ExpenseDateTile
            backgroundColor={'transparent'}
            borderBottomWidth={1}
            Label={'Date'}
            borderColor={colors.grey2}
            onPress={handleDatePress}
            selectedDate={selectedDate}
          />

          <PaymentDetailMethod
            Label={'Payment'}
            backgroundColor={'transparent'}
            borderBottomWidth={1}
            borderColor={colors.grey2}
          />
          <AbstractTextInput
            backgroundColor={'transparent'}
            borderBottomWidth={1}
            borderColor={colors.grey2}
            Label={'Note'}
            PlaceHolder={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
            }
            placeholderTextColor={colors.black}
            renderLabelIcon={() => <ClipBoardIconSvg width={15} height={17} />}
          />
        </View>
        <View
          style={[
            styles.horizontalContainer,
            {
              height: 40,
              width: '100%',
              backgroundColor: 'transparent',
              // paddingHorizontal: 0,
              paddingVertical: 0,
              flexDirection: 'row',
            },
          ]}>
          <AbstractButton
            backgroundColor={lightThemeColors.red1}
            height={40}
            title={'Save'}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'48%'}
            borderRadius={30}
            onPress={handleLeftArrowPressed}
          />
          <AbstractButton
            borderWidth={1}
            borderColor={colors.black}
            backgroundColor={'transparent'}
            height={40}
            title={'Cancel'}
            titleStyle={{
              color: colors.black,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'48%'}
            borderRadius={30}
            onPress={handleLeftArrowPressed}
          />
        </View>
      </View>
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
      />
    </View>
  );
};

export default OneTimeExpense;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },
  headerContainer: {
    height: 253,
    backgroundColor: lightThemeColors.darkBlue,
    width: '100%',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  horizontalContainer: {
    height: 406,
    // backgroundColor: 'red',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sugesstionHeading: {
    fontFamily: Fonts.interItalic,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '600',
    fontSize: 12,
  },
});
