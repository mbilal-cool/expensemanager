import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import AbstractButton from '../Abstract/abstractButton';
import {lightThemeColors, Fonts} from '../../theme';
import PdfIconSvg from '../../Assets/Icons/pdfSvg';
import ArrowRightIconSvg from '../../Assets/Icons/arrowRightsvg';
import ArrowUpIconSvg from '../../Assets/Icons/arrowUpWithTailSvg';
import {useTheme} from '@react-navigation/native';

const ExpenseDetailItem = ({
  expensesList,
  borderRadius,
  borderBottomWidth,
  marginBottom,
  height,
  width,
  backgroundColor,
  status,
  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;
  const defaultHeight = height ? height : 32;
  const defaultMarginBottom = marginBottom ? marginBottom : 0;
  const defaultBorderBottomWidth = borderBottomWidth ? borderBottomWidth : 0;

  return (
    <FlatList
      data={expensesList}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity
            onPress={() => onPress()}
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
                {item.date}
              </Text>
            </View>
            <View style={styles.col}>
              <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                {item.name}
              </Text>
            </View>
            <View style={[styles.col]}>
              <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                {item.type}
              </Text>
            </View>
            <View style={[styles.col]}>
              <Text style={[styles.itemTextStyle, {color: colors.black}]}>
                {item.Amount}
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
      keyExtractor={item => item.id}
    />
  );
};

export default ExpenseDetailItem;
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
