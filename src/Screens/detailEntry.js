import {
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

import AbstractButton from '../Components/Abstract/abstractButton';

import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import ExpenseDetailScreenItem from '../Components/Module/expenseDetailScreenItem';
import PencilIconSvg from '../Assets/Icons/pencilSvg';
import {useTheme} from '@react-navigation/native';
import ExpensesBottomSheet from '../Components/Module/expensesBottomSheet';

const EntryDetails = ({navigation}) => {
  const [sheetType, SetSheetType] = useState('deleteEntry');

  const {colors} = useTheme();
  const handleEditPressed = () => {
    navigation.navigate('OneTimeExpense');
  };
  const handleLeftArrowPressed = () => {
    navigation.goBack();
  };

  const openExpensesBottomSheet = () => {
    SetSheetType('deleteEntry');
    SheetManager.show('detail');
  };
  const onDeleteButtonPress = () => {
    SheetManager.hide('detail');
    navigation.goBack();
  };
  const onCloseButtonPress = () => {
    SheetManager.hide('detail');
  };

  return (
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
              paddingHorizontal: 10,
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
                description={'joe Salary'}
              />
            </View>
            <View style={styles.Column}>
              <ExpenseDetailScreenItem
                title={'Expense Type'}
                description={' Salary'}
              />
            </View>
          </View>
          <View style={styles.Tile}>
            <View style={styles.Column}>
              <ExpenseDetailScreenItem
                title={'Expense Date'}
                description={'22/10/2022'}
              />
            </View>
            <View style={styles.Column}>
              <ExpenseDetailScreenItem
                title={'Expense Amount'}
                description={'$4500'}
              />
            </View>
          </View>
          <View style={styles.Tile}>
            <View style={styles.Column}>
              <ExpenseDetailScreenItem
                title={'Expense State'}
                description={'Reccuring'}
              />
            </View>
            <View style={styles.Column}>
              <ExpenseDetailScreenItem
                title={'Medium'}
                description={'ONline'}
              />
            </View>
          </View>
          <View style={styles.Tile}>
            <View style={styles.Column}>
              <ExpenseDetailScreenItem
                title={'Expense Added'}
                description={'05 May, 2022'}
              />
            </View>
          </View>
          <View style={styles.Tile}>
            <View style={[styles.Column, {width: '100%'}]}>
              <ExpenseDetailScreenItem
                title={'Note'}
                description={
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
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
            title={'Delete'}
            titleStyle={{
              color: colors.red2,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            width={'48%'}
            borderRadius={30}
            onPress={openExpensesBottomSheet}
          />
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
        </View>
      </View>
      <ExpensesBottomSheet
        id={'detail'}
        onPress={[onDeleteButtonPress, onCloseButtonPress]}
        reportType={sheetType}
        setReportType={SetSheetType}
      />
    </View>
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
