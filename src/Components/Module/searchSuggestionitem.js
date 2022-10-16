import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
const SearchSugesstionItem = ({
  height,

  backgroundColor,

  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : lightThemeColors.white2;
  const defaultHeight = height ? height : 30;
  return (
    <View
      style={[
        styles.main,
        {
          maxHeight: 246,
          minHeight: defaultHeight,
          backgroundColor: colors.white,
        },
      ]}>
      <TouchableOpacity onPress={() => onPress()} style={[styles.tile, {}]}>
        <Text style={[styles.sugesstionHeading]}>Expense Type</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress()} style={[styles.tile, {}]}>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          Salary Expanse
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress()} style={[styles.tile, {}]}>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          Salary Cathy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress()} style={[styles.tile, {}]}>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          Salary Frank
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress()} style={[styles.tile, {}]}>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          Salary Alex
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress()} style={[styles.tile, {}]}>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          Salary Ben
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchSugesstionItem;
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: '61%',
    left: 20,
    width: '100%',

    borderRadius: 13,
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  tile: {
    height: 30,
    width: '100%',
    // backgroundColor: 'green',
    flexDirection: 'row',
  },
  sugesstionHeading: {
    fontFamily: Fonts.interItalic,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.grey,
  },
  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.black,
  },
});
