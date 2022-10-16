import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
import Calender1IconSvg from '../../Assets/Icons/calender1Svg';
const ExpenseDateTile = ({
  Height,
  Width,
  Label,
  borderRadius,
  borderWidth,
  borderColor,
  borderBottomWidth,
  Value,
  onPress = () => false,
  backgroundColor,
  labelStyle,
  selectedDate,
}) => {
  const {colors} = useTheme();

  const defaultHeight = Height ? Height : 50;
  const defaultWidth = Width ? Width : '100%';
  const defaultLabel = Label ? Label : 'TextInput';
  const defaultBorderRadius = borderRadius ? borderRadius : 50;
  const defaultBorderWidth = borderWidth ? borderWidth : 0;
  const defaultBorderBottomWidth = borderBottomWidth ? borderBottomWidth : null;
  const defaultBorderColor = borderColor ? borderColor : lightThemeColors.grey1;
  const defaultValue = Value ? Value : null;
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
        <View style={[styles.col, {justifyContent: 'flex-start'}]}>
          <Calender1IconSvg height={12} width={15} />
        </View>
        <View
          style={[
            styles.col,
            {
              //   backgroundColor: 'green',
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
              alignItems: 'center',
              justifyContent: 'flex-start',
              //   backgroundColor: 'green',
              width: '85%',

              borderBottomWidth: defaultBorderBottomWidth,
              borderColor: defaultBorderColor,
            },
          ]}>
          <Text style={[styles.placeHolderTextStyle, {color: colors.black}]}>
            {selectedDate ? selectedDate : '05,May,20222'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExpenseDateTile;

const styles = StyleSheet.create({
  inputBox: {
    height: 50,

    width: '100%',
    backgroundColor: 'black',
    // alignItems: 'center',
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
