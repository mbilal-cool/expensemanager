import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../../theme';

const SearchResultItem = ({
  height,

  backgroundColor,

  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : 'transparent';
  const defaultHeight = height ? height : 32;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.Tile,
        {
          height: defaultHeight,
          backgroundColor: defaultBackgroundColor,
          borderColor: colors.grey2,
        },
      ]}>
      <Text style={[styles.itemTextStyle, {color: colors.black}]}>
        Salary Alex
      </Text>
    </TouchableOpacity>
  );
};

export default SearchResultItem;
const styles = StyleSheet.create({
  Tile: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: lightThemeColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: lightThemeColors.grey2,
  },

  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.black,
  },
});
