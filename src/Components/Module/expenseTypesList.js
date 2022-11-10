import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../../theme';
import ExpenseController from '../../Controller/expenseController';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const ExpenseCategoryListPlacehlder = ({showAllButton}) => {
  const {colors} = useTheme();
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="flex-end"
        marginBottom={12}>
        <SkeletonPlaceholder.Item width={50} height={50} borderRadius={50} />

        <SkeletonPlaceholder.Item
          width={'79%'}
          height={50}
          borderRadius={4}
          marginLeft={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

const ExpenseTypesList = ({
  expenseTypes,
  height,
  backgroundColor,
  onPress = () => false,
}) => {
  let placeHolderArray = [0, 0, 0, 0];

  const expensesCategories = useSelector(
    state => state.expense.expenseCategories,
  );

  const [loading, setLoading] = useState(true);
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : 'transparent';
  const defaultHeight = height ? height : 50;
  useEffect(() => {
    ExpenseController.handlegetExpenseCategories(res => {
      setLoading(res);
    });
  }, []);

  return loading ? (
    placeHolderArray.map((item, index) => {
      return <ExpenseCategoryListPlacehlder key={index} />;
    })
  ) : (
    <>
      {expensesCategories.data?.map((item, index) => {
        var matches = item.name.match(/\b(\w)/g);
        var acronym = matches.join(''); // JSON
        var sf = acronym.slice(0, 2);
        return (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              onPress(item);
            }}
            style={[
              styles.Tile,
              {
                height: defaultHeight,
                backgroundColor: defaultBackgroundColor,
                borderBottomWidth: 1,
                borderColor: colors.grey2,
              },
            ]}>
            <View style={[styles.circle, {backgroundColor: colors.black1}]}>
              <Text
                style={[
                  styles.itemTextStyle,
                  {color: colors.white, marginLeft: 0},
                ]}>
                {sf}
              </Text>
            </View>
            <Text style={[styles.itemTextStyle, {color: colors.black}]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default ExpenseTypesList;
const styles = StyleSheet.create({
  Tile: {
    flexDirection: 'row',
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
  },

  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.black,
    marginLeft: 15,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: lightThemeColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
