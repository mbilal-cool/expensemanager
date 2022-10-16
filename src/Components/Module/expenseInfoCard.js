import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts} from '../../theme';
import {useTheme} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');

const ExpenseInfoCard = ({
  backgroundColor,

  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;

  return (
    <View
      style={[
        styles.main,
        {
          height: height * 0.2,
          backgroundColor: defaultBackgroundColor,
        },
        styles.Shadow,
      ]}>
      <View style={[styles.tile, {height: height * 0.05}]}>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          Total Expenses
        </Text>
      </View>
      <View style={[styles.tile, {height: height * 0.065}]}>
        <Text
          style={[
            styles.priceTag,
            {
              color: colors.red1,
              marginLeft: 5,
            },
          ]}>
          Rs. 1,000,000
        </Text>
      </View>
    </View>
  );
};

export default ExpenseInfoCard;
const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: '62%',
    left: 20,
    width: '100%',
    justifyContent: 'space-around',
    borderRadius: 13,
    paddingVertical: 20,
    paddingHorizontal: 20,
    zIndex: 9999,
  },
  tile: {
    height: 29,
    width: '100%',
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  priceTag: {
    fontFamily: Fonts.interBold,
    fontWeight: '700',
    fontSize: 32,
  },
  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 24,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
