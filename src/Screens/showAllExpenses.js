import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Fonts, lightThemeColors} from '../theme';

import {useTheme} from '@react-navigation/native';
import {expenseList} from '../mockData';
// import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
import ExpenseDetailHeader from '../Components/Module/expenseDetailHeader';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import ThemeController from '../Controller/themeController';

import AbstractHeader from '../Components/Abstract/abstractHeader';
import {useGetExpensesDetails} from '../Controller/expenseController';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import ExpenseDetailItem from '../Components/Module/expenseDetailItem';
const ExpenseDetailItemListPlacehlder = ({showAllButton}) => {
  const {colors} = useTheme();

  return (
    <SkeletonPlaceholder
      borderRadius={4}
      backgroundColor={colors.white}
      highlightColor={'#F4f4f9'}
      speed={1200}>
      <SkeletonPlaceholder.Item alignItems="center">
        <SkeletonPlaceholder.Item width={'100%'} height={27} marginBottom={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
export default function ShowAllExpenses({route, navigation}) {
  const {viewAllType} = route.params;
  const allExpenses = useGetExpensesDetails(viewAllType);
  console.log('allexp', viewAllType);
  const {colors} = useTheme();
  const [expenses, SetExpenses] = useState(expenseList);
  const [darkMode, setDarkMode] = useState();
  const [noOfPlaceHolders, setNoOfPlaceHolders] = useState([0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
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
  const onPressSingleExpenseItem = item => {
    navigation.navigate('EntryDetails', {
      singleExpense: item,
      screenName: route.name,
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
      <View style={styles.itemWrapper}>
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
            <FlatList
              showsVerticalScrollIndicator={false}
              bounces={false}
              data={allExpenses}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <ExpenseDetailItem
                    key={index}
                    item={item}
                    onPress={item => onPressSingleExpenseItem(item)}
                  />
                );
              }}
            />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  itemWrapper: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
    // backgroundColor: 'yellow',
  },

  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 16,
    color: lightThemeColors.black,
  },
});
