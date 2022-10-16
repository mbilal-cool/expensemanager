import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Fonts, lightThemeColors} from '../theme';

import {useTheme} from '@react-navigation/native';
import {expenseList} from '../mockData';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import ThemeController from '../Controller/themeController';

import AbstractHeader from '../Components/Abstract/abstractHeader';

import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';

export default function ShowAllExpenses({navigation}) {
  const {colors} = useTheme();
  const [expenses, SetExpenses] = useState(expenseList);
  const [darkMode, setDarkMode] = useState();

  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const reportDetailItemPressed = () => {
    navigation.navigate('EntryDetails');
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
            <Text style={[styles.titleStyle, {color: colors.black}]}>All</Text>
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
      <ExpenseDetailHeader />

      <View
        style={[
          styles.containerHorizontal,
          {
            height: 714,
            // backgroundColor: 'yellow',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingHorizontal: 20,
          },
        ]}>
        <ExpenseDetailItem
          onPress={reportDetailItemPressed}
          expensesList={expenses}
          borderRadius={6}
          marginBottom={5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 16,
    color: lightThemeColors.black,
  },
});
