import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import SearchIconSvg from '../../Assets/Icons/searchSvg';
import CalenderIconSvg from '../../Assets/Icons/calenderSvg';
import ClipBoardIconSvg from '../../Assets/Icons/clipboardSvg';
const {height, width} = Dimensions.get('window');

const DateRange = ({
  Height,
  Width,
  backgroundColor,
  startDate,
  endDate,
  setDateType,
  borderRadius,
  borderWidth,
  borderColor,
  Value,
  onStartDatePress = () => false,
  onEndDatePress = () => false,
}) => {
  const defaultHeight = Height ? Height : height * 0.06;
  const defaultWidth = Width ? Width : '100%';
  const defaultBorderRadius = borderRadius ? borderRadius : 100;
  const defaultValue = Value ? Value : null;
  const defaultBorderWidth = borderWidth ? borderWidth : 0;
  const defaultBorderColor = borderColor ? borderColor : 0;

  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : lightThemeColors.darkBlue1;

  return (
    <View
      style={[
        styles.searchBox,
        {
          height: defaultHeight,
          width: defaultWidth,
          borderRadius: defaultBorderRadius,
          backgroundColor: defaultBackgroundColor,
          borderWidth: defaultBorderWidth,
          borderColor: defaultBorderColor,
        },
      ]}>
      <TouchableOpacity
        onPress={() => {
          onStartDatePress();
        }}
        style={styles.tile}>
        <CalenderIconSvg />
        <Text style={styles.labelStyle}>{startDate}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onEndDatePress();
        }}
        style={[styles.tile, {borderRightWidth: 0, paddingLeft: 13}]}>
        <CalenderIconSvg />
        <Text style={styles.labelStyle}>{endDate}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DateRange;

const styles = StyleSheet.create({
  searchBox: {
    flexDirection: 'row',
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  tile: {
    flexDirection: 'row',
    height: '100%',
    width: ' 50%',
    // backgroundColor: 'cyan',
    alignItems: 'center',
    // justifyContent: 'space-around',
    borderRightWidth: 1,
    borderColor: lightThemeColors.darkBlue2,
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey1,
    marginLeft: 11,
  },
  textInput: {
    height: '100%',
    width: '100%',

    // backgroundColor: 'blue',
  },
});
