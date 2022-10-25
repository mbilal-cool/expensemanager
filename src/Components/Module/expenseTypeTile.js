import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import AllExpensesIconSvg from '../../Assets/Icons/BottomTabSvgs/allExpensesSvg';
import ArrowRightIconSvg from '../../Assets/Icons/arrowRightsvg';
import {useTheme} from '@react-navigation/native';
const ExpenseTypeTile = ({
  Height,
  Width,
  Label,
  placeHolder,
  borderColor,
  borderBottomWidth,
  onPress = () => false,
  backgroundColor,
  labelStyle,
}) => {
  const {colors} = useTheme();
  const defaultHeight = Height ? Height : 50;
  const defaultWidth = Width ? Width : '100%';
  const defaultLabel = Label ? Label : 'TextInput';
  const defaultBorderBottomWidth = borderBottomWidth ? borderBottomWidth : null;
  const defaultBorderColor = borderColor ? borderColor : lightThemeColors.grey1;
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;
  const defaultLabelStyle = labelStyle ? labelStyle : styles.labelStyle;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.inputBox,
        {
          height: defaultHeight,
          width: defaultWidth,

          backgroundColor: defaultBackgroundColor,
        },
      ]}>
      <View style={styles.tile}>
        <View
          style={[
            styles.col,
            {
              justifyContent: 'flex-start',
              // backgroundColor: 'red',
              paddingTop: 3,
            },
          ]}>
          <AllExpensesIconSvg height={12} width={15} />
        </View>
        <View
          style={[
            styles.col,
            {
              // backgroundColor: 'green',
              width: '90%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            },
          ]}>
          <Text style={defaultLabelStyle}>{defaultLabel}</Text>
        </View>
      </View>

      <View style={[styles.tile, {height: 25}]}>
        <View style={[styles.col, {justifyContent: 'flex-start'}]}></View>
        <View
          style={[
            styles.col,
            {
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              // backgroundColor: 'green',
              width: '90%',
              paddingTop: 3,
              borderBottomWidth: defaultBorderBottomWidth,
              borderColor: defaultBorderColor,
            },
          ]}>
          <Text style={[styles.placeHolderTextStyle, {color: colors.black}]}>
            {placeHolder ? placeHolder : 'office'}
          </Text>
          <ArrowRightIconSvg height={10} width={10} color={colors.red1} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseTypeTile;

const styles = StyleSheet.create({
  inputBox: {
    height: 50,

    width: '100%',

    justifyContent: 'space-between',
  },
  tile: {
    height: 20,
    width: '100%',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
  },
  col: {
    height: '100%',
    width: ' 10%',
    // backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 12,
    color: lightThemeColors.grey1,
  },
  placeHolderTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 12,
  },
});
