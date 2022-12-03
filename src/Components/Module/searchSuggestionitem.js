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
  item,
  backgroundColor,

  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : lightThemeColors.white2;
  const defaultHeight = height ? height : 30;
  return (
    <TouchableOpacity onPress={() => onPress(item)} style={[styles.tile, {}]}>
      <Text style={[styles.itemTextStyle, {color: colors.black}]}>
        {item.expenseName}
      </Text>
    </TouchableOpacity>
  );
};
export default SearchSugesstionItem;
const styles = StyleSheet.create({
  // main: ,
  tile: {
    height: 30,
    width: '100%',
    // backgroundColor: 'green',
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
  },
});
