import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AbstractButton from '../Abstract/abstractButton';
import {lightThemeColors, Fonts} from '../../theme';
import PdfIconSvg from '../../Assets/Icons/pdfSvg';
import ArrowRightIconSvg from '../../Assets/Icons/arrowRightsvg';
import ArrowUpIconSvg from '../../Assets/Icons/arrowUpWithTailSvg';
import {useTheme} from '@react-navigation/native';
import ExpenseController from '../../Controller/expenseController';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useSelector} from 'react-redux';
import {setExpense} from '../../utils/Redux/Slices/expenseSlice';

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

const ExpenseDetailItemList = ({
  showAllButton,
  noOfPlaceHolders,
  date,
  borderRadius,
  borderBottomWidth,
  marginBottom,
  height,
  width,
  backgroundColor,
  status,
  navigation,
}) => {
  const [expenseList, SetExpenseList] = useState();
  const [loading, setLoading] = useState(true);
  const expenses = useSelector(state => state.expense.expenses);
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;
  const defaultHeight = height ? height : 32;
  const defaultMarginBottom = marginBottom ? marginBottom : 0;
  const defaultBorderBottomWidth = borderBottomWidth ? borderBottomWidth : 0;
  useEffect(() => {
    ExpenseController.handleExpenseList(res => setLoading(res));

    let filteredByDate = date
      ? expenses.filter(item => item.createdAt === date)
      : expenses;
    let sliced = showAllButton ? filteredByDate.slice(0, 3) : filteredByDate;
    SetExpenseList(sliced);
  }, [expenses]);

  const onViewAllpress = () => {
    navigation.navigate('ShowAllExpenses');
  };

  const handleOnpress = id => {
    navigation.navigate('EntryDetails', {id});
  };

  return (
    <>
      {loading ? (
        <>
          {noOfPlaceHolders.map((item, index) => (
            <ExpenseDetailItemListPlacehlder key={index} showAllButton />
          ))}
          {showAllButton ? (
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
          ) : null}
        </>
      ) : showAllButton ? (
        <>
          {expenseList.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleOnpress(item.id)}
                style={[
                  styles.Tile,
                  {
                    height: defaultHeight,
                    backgroundColor: defaultBackgroundColor,
                    borderRadius: borderRadius ? borderRadius : 0,
                    borderBottomWidth: defaultBorderBottomWidth,
                    marginBottom: defaultMarginBottom,
                  },
                  styles.shadowProp,
                ]}>
                <View
                  style={[
                    styles.col,
                    {justifyContent: 'flex-start', paddingLeft: 10},
                  ]}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.createdAt}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.expenseName}
                  </Text>
                </View>
                <View style={[styles.col]}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.expenseCategory}
                  </Text>
                </View>
                <View style={[styles.col]}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.amount}
                  </Text>
                  {status ? (
                    <View style={{marginLeft: 10}}>
                      <ArrowUpIconSvg />
                    </View>
                  ) : (
                    <View style={{marginLeft: 10}}>
                      <ArrowRightIconSvg color={colors.red1} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
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
              onPress={onViewAllpress}
            />
          </View>
        </>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={expenseList}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleOnpress(item.id)}
                style={[
                  styles.Tile,
                  {
                    height: defaultHeight,
                    backgroundColor: defaultBackgroundColor,
                    borderRadius: borderRadius ? borderRadius : 0,
                    borderBottomWidth: defaultBorderBottomWidth,
                    marginBottom: defaultMarginBottom,
                  },
                  styles.shadowProp,
                ]}>
                <View
                  style={[
                    styles.col,
                    {justifyContent: 'flex-start', paddingLeft: 10},
                  ]}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.createdAt}
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.expenseName}
                  </Text>
                </View>
                <View style={[styles.col]}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.expenseCategory}
                  </Text>
                </View>
                <View style={[styles.col]}>
                  <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                    {item.amount}
                  </Text>
                  {status ? (
                    <View style={{marginLeft: 10}}>
                      <ArrowUpIconSvg />
                    </View>
                  ) : (
                    <View style={{marginLeft: 10}}>
                      <ArrowRightIconSvg color={colors.red1} />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </>
  );
};

export default ExpenseDetailItemList;
const styles = StyleSheet.create({
  main: {
    width: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    flexDirection: 'row',
    height: '100%',
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 10,
  },

  Tile: {
    flexDirection: 'row',

    width: '100%',
    backgroundColor: lightThemeColors.white,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: lightThemeColors.grey,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 18,
    color: lightThemeColors.black,
  },
  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 10,
    color: lightThemeColors.black,
  },
  shadowProp: {
    shadowColor: 'rgba(0, 0, 0, 0.02)',
    shadowOffset: {width: 14, height: 20},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
