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
const ExpenseDetailScreenItem = ({
  height,
  title,
  description,
  backgroundColor,
  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.defaultBackground;
  const defaultHeight = height ? height : 48;
  return (
    <View
      style={[
        styles.Tile,
        {
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: defaultHeight,
          backgroundColor: defaultBackgroundColor,
        },
      ]}>
      <View style={[styles.Tile, {minHeight: 19}]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.itemHeadingStyle, {color: colors.grey5}]}>{`${
          title ? title : ' title'
        }:`}</Text>
      </View>
      <View style={[styles.Tile, {minHeight: 19, maxHeight: 67}]}>
        <Text
          adjustsFontSizeToFit
          numberOfLines={1}
          style={[styles.itemTextStyle, {color: colors.black}]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default ExpenseDetailScreenItem;
const styles = StyleSheet.create({
  Tile: {
    width: '100%',
    // backgroundColor: lightThemeColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemHeadingStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '400',
    fontSize: 14,
    color: lightThemeColors.grey5,
  },
  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 12,
    color: lightThemeColors.black,
  },
});
