import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../../theme';
const ExpenseTypeItem = ({
  item,
  height,
  backgroundColor,
  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultHeight = height ? height : 50;
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : 'transparent';
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
          style={[styles.itemTextStyle, {color: colors.white, marginLeft: 0}]}>
          {sf}
        </Text>
      </View>
      <Text style={[styles.itemTextStyle, {color: colors.black}]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};
export default ExpenseTypeItem;
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
