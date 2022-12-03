import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {lightThemeColors, Fonts} from '../theme';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractHeader from '../Components/Abstract/abstractHeader';
import {SheetManager} from 'react-native-actions-sheet';
import ExpenseController from '../Controller/expenseController';
import AbstractButton from '../Components/Abstract/abstractButton';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import ExpenseDetailScreenItem from '../Components/Module/expenseDetailScreenItem';
import PencilIconSvg from '../Assets/Icons/pencilSvg';
import {useTheme} from '@react-navigation/native';
import ExpensesBottomSheet from '../Components/Module/expensesBottomSheet';
import {useGetSingleExpence} from '../Controller/expenseController';
import {useSelector} from 'react-redux';
const EntryDetails = ({navigation, route}) => {
  const [loading, setLoading] = useState();
  const [sheetType, SetSheetType] = useState('deleteEntry');
  const {singleExpense, screenName, previousRoute} = route.params;
  console.log(
    'singleExpensepppp',
    singleExpense,
    'route: ',
    screenName,
    'previousRoute: ',
    previousRoute,
  );
  const {colors} = useTheme();
  const categorySelector = cat_id => {
    const allCategories = useSelector(state => state.expense.expenseCategories);
    const newArr = [...allCategories];
    const newObj = newArr.find(item => item._id == cat_id);
    return newObj?.name;
  };
  const handleEditPressed = () => {
    if (screenName == 'Catalog') {
      navigation.navigate('AddCatalog', {
        editExpense: singleExpense,
        type: 'edit',
      });
    } else {
      navigation.navigate('EditExpense', {
        editExpense: singleExpense,
        type: 'edit',
        screenName,
      });
    }
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };
  const goWithButtonPressed = () => {
    navigation.navigate('RecurringExpense', {
      editExpense: singleExpense,
      type: 'edit',
    });
  };
  const openExpensesBottomSheet = () => {
    SetSheetType('deleteEntry');
    SheetManager.show('detail');
  };
  const onDeleteButtonPress = () => {
    SheetManager.hide('detail');
    setLoading(true);
    if (screenName == 'Catalog') {
      // console.log('delete catalog k saath call hua%%%%%%%%');
      ExpenseController.DeleteExpenceItemFromCatalog(
        singleExpense._id,
        res => {
          if (res) {
            console.log(res);
          }
        },
        loading_res => setLoading(loading_res),
        navigation.goBack(),
      );
    } else {
      ExpenseController.DeleteExpenceItem(
        singleExpense._id,
        res => {
          if (res) {
            console.log(res);
          }
        },
        loading_res => setLoading(loading_res),
        navigation.goBack(),
      );
    }
  };
  const onCloseButtonPress = () => {
    SheetManager.hide('detail');
  };

  return (
    <>
      <View
        style={[
          styles.main,
          {backgroundColor: colors.defaultBackground},
          styles.shadow,
        ]}>
        <FocusAwareStatusBar
          barStyle="dark-content"
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
                Entery Details
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
          <View style={styles.horizontalContainer}>
            <View style={styles.Tile}>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Expense Name'}
                  description={
                    singleExpense ? singleExpense.expenseName : 'salary'
                  }
                />
              </View>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Expense Type'}
                  description={
                    singleExpense
                      ? categorySelector(singleExpense.expenseCategory)
                      : 'office Expense'
                  }
                />
              </View>
            </View>
            <View style={styles.Tile}>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Expense Date'}
                  description={
                    singleExpense
                      ? ExpenseController.dateSlicer(singleExpense.createdAt)
                      : '30/10/22'
                  }
                />
              </View>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Expense Amount'}
                  description={singleExpense ? singleExpense.amount : '35000'}
                />
              </View>
            </View>
            <View style={styles.Tile}>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Expense State'}
                  description={
                    singleExpense
                      ? singleExpense.expenseType == '63625be0bec8a249188c9be2'
                        ? 'Reccuring Expense'
                        : 'Onetime Expense'
                      : 'oneTime'
                  }
                />
              </View>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Medium'}
                  description={
                    singleExpense ? singleExpense.paymentMedium : 'onLine'
                  }
                />
              </View>
            </View>
            <View style={styles.Tile}>
              <View style={styles.Column}>
                <ExpenseDetailScreenItem
                  title={'Expense Added'}
                  description={
                    singleExpense
                      ? ExpenseController.dateSlicer(singleExpense.createdAt)
                      : '30/10/22'
                  }
                />
              </View>
            </View>
            <View style={styles.Tile}>
              <View style={[styles.Column, {width: '100%'}]}>
                <ExpenseDetailScreenItem
                  title={'Note'}
                  description={
                    singleExpense ? singleExpense.note : 'my First note'
                  }
                />
              </View>
            </View>
          </View>
          <View style={[styles.Tile, {paddingHorizontal: 20}]}>
            <AbstractButton
              borderWidth={1}
              borderColor={colors.red2}
              backgroundColor={'transparent'}
              height={40}
              title={
                (screenName == 'Catalog' &&
                  previousRoute == 'RecurringExpense') ||
                previousRoute == 'Search'
                  ? 'go with'
                  : 'Delete'
              }
              titleStyle={{
                color: colors.red2,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              width={previousRoute == 'Search' ? '100%' : '48%'}
              borderRadius={30}
              onPress={
                screenName == 'Catalog' ||
                (screenName == 'Search' &&
                  previousRoute == 'RecurringExpense') ||
                previousRoute == 'Search'
                  ? goWithButtonPressed
                  : openExpensesBottomSheet
              }
            />
            {screenName != 'Search' ? (
              <AbstractButton
                borderWidth={1}
                borderColor={colors.black}
                backgroundColor={'transparent'}
                height={40}
                title={'Edit'}
                titleStyle={{
                  color: colors.black,
                  fontFamily: Fonts.interBold,
                  fontWeight: '600',
                  fontSize: 16,
                }}
                iconMargin={10}
                width={'48%'}
                borderRadius={30}
                onPress={handleEditPressed}
                renderLeftIcon={() => <PencilIconSvg color={colors.black} />}
              />
            ) : null}
          </View>
        </View>
        <ExpensesBottomSheet
          id={'detail'}
          onPress={[onDeleteButtonPress, onCloseButtonPress]}
          reportType={sheetType}
          setReportType={SetSheetType}
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

export default EntryDetails;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: lightThemeColors.defaultBackground,
    alignItems: 'center',
    zIndex: 0,
    // paddingHorizontal: 30,
  },
  Column: {
    width: '45%',
    backgroundColor: lightThemeColors.darkBlue,
  },
  Tile: {
    // paddingHorizontal: 20,
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  middleContainer: {
    flex: 1,
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  horizontalContainer: {
    height: 420,
    // backgroundColor: 'red',
    width: '100%',
    // justifyContent: 'space-between',
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
    fontWeight: '500',
    fontSize: 20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
