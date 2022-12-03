import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ActivityIndicator,
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
import ExpenseController, {
  categorySelector,
  dateConverter,
  getMinimumDate,
} from '../Controller/expenseController';
import {useSelector} from 'react-redux';
const RecurringExpense = ({route, navigation}) => {
  const userId = useSelector(state => state.user.user.id);
  const {editExpense, type, expensCategoryItem} = route.params;
  // console.log('categoryItem', expensCategoryItem);
  const [loading, setLoading] = useState(false);
  const [recurringExpenseID, SetoneTimeExpenseID] = useState(
    '63625be0bec8a249188c9be2',
  );
  const [expense, setExpense] = useState({
    amount: 3500,
    expenseName: 'Office Expense',
    note: 'Lorem Ipsum has been the industrys ',
    createdAt: dateConverter(new Date()),
    deletedAt: '2022-11-14',
    paymentMedium: 'Cash',
    createdBy: userId,
    expenseType: recurringExpenseID,
    expenseCategory: '6376256871e7fe0016d3c6bc',
  });
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const {colors} = useTheme();
  useEffect(() => {
    if (expensCategoryItem) {
      setExpense({...expense, expenseCategory: expensCategoryItem._id});
    }
  }, [expensCategoryItem]);
  useEffect(() => {
    if (editExpense) {
      const {_id, __v, ...res} = editExpense ? editExpense : null;
      setExpense(res);
    }
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });

    return () => {
      ThemeController.removingListener();
    };
  }, [editExpense]);
  const onAddfromCatalogPress = () => {
    navigation.navigate('Catalog', {previousRoute: route.name});
  };
  const handleExpenseTypePressed = () => {
    navigation.navigate('ExpenseType', {
      type,
      screenName: route.name,
      editExpense,
    });
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  const onConfirmDate = inputDate => {
    setExpense(prev => ({
      ...prev,
      createdAt: dateConverter(new Date(inputDate)),
    }));
    setOpen(false);
  };
  const handleDatePress = () => {
    setOpen(true);
  };
  const handleSavePress = () => {
    setLoading(true);
    ExpenseController.handleAddExpense(expense, res => {
      setLoading(false),
        ExpenseController.findAllExpensesHandler(res => navigation.goBack());
    });
  };
  return (
    <>
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
              <Text
                style={[
                  styles.titleStyle,
                  {color: colors.black, fontSize: 20},
                ]}>
                Recurring Expense
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
                paddingHorizontal: 25,
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
                // backgroundColor: colors.white,
                // backgroundColor: 'tomato',
              },
            ]}>
            <AbstractTextInput
              onChangeText={e => setExpense(prev => ({...prev, amount: e}))}
              Value={expense.amount.toString()}
              backgroundColor={'transparent'}
              borderBottomWidth={1}
              borderColor={colors.grey2}
              Label={'Amount'}
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
              onChangeText={e =>
                setExpense(prev => ({...prev, expenseName: e}))
              }
              Value={expense.expenseName}
              backgroundColor={'transparent'}
              borderBottomWidth={1}
              borderColor={colors.grey2}
              Label={'Expense Name'}
              PlaceHolder={editExpense ? editExpense.expenseName : 'Salary'}
              placeholderTextColor={colors.black}
              renderLabelIcon={() => (
                <AllExpensesIconSvg width={15} height={17} />
              )}
            />
            <ExpenseTypeTile
              backgroundColor={'transparent'}
              borderBottomWidth={1}
              Label={'ExpenseType'}
              placeHolder={categorySelector(
                expensCategoryItem
                  ? expensCategoryItem._id
                  : expense.expenseCategory,
              )}
              borderColor={colors.grey2}
              onPress={handleExpenseTypePressed}
            />

            <ExpenseDateTile
              backgroundColor={'transparent'}
              borderBottomWidth={1}
              Label={'Date'}
              borderColor={colors.grey2}
              onPress={handleDatePress}
              selectedDate={ExpenseController.dateSlicer(expense.createdAt)}
            />

            <PaymentDetailMethod
              defaultCheckedItem={expense.paymentMedium}
              Label={'Payment'}
              backgroundColor={'transparent'}
              borderBottomWidth={1}
              borderColor={colors.grey2}
              onPress={title =>
                setExpense(prev => ({...prev, paymentMedium: title}))
              }
            />
            <AbstractTextInput
              onChangeText={e => setExpense(prev => ({...prev, note: e}))}
              Value={expense.note}
              backgroundColor={'transparent'}
              borderBottomWidth={1}
              borderColor={colors.grey2}
              Label={'Note'}
              PlaceHolder={
                editExpense
                  ? editExpense.note
                  : 'Lorem Ipsum has been the industrys standard dummy text ever'
              }
              placeholderTextColor={colors.black}
              renderLabelIcon={() => (
                <ClipBoardIconSvg width={15} height={17} />
              )}
            />
          </View>

          <View
            style={[
              styles.horizontalContainer,
              {
                flex: 1,
                width: '100%',
                // backgroundColor: 'red',
                paddingHorizontal: 0,
                paddingVertical: 0,
                flexDirection: 'row',
              },
            ]}>
            <AbstractButton
              backgroundColor={'transparent'}
              height={20}
              title={'Add From Catalog'}
              titleStyle={{
                color: colors.black,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 13,
                fontStyle: 'italic',

                textDecorationLine: 'underline',
              }}
              iconMargin={10}
              width={'43%'}
              borderRadius={30}
              onPress={onAddfromCatalogPress}
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
              title={type == 'edit' ? 'Done' : 'Save'}
              titleStyle={{
                color: colors.white,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              width={'48%'}
              borderRadius={30}
              onPress={handleSavePress}
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
          minimumDate={new Date(getMinimumDate(new Date()))}
          maximumDate={new Date()}
          modal
          mode="date"
          open={open}
          date={date}
          onConfirm={date => onConfirmDate(date)}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
      {loading ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <ActivityIndicator size="large" color={colors.black} />
        </View>
      ) : (
        false
      )}
    </>
  );
};

export default RecurringExpense;

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
