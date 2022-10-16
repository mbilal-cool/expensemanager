import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../../theme';

const ExpenseTypesList = ({
  expenseTypes,
  height,
  backgroundColor,
  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : 'transparent';
  const defaultHeight = height ? height : 50;
  return expenseTypes?.map((item, index) => {
    var matches = item.title.match(/\b(\w)/g);
    var acronym = matches.join(''); // JSON
    var sf = acronym.slice(0, 2);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPress()}
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
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  });
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
