import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import PaymentMethodIconSvg from '../../Assets/Icons/paymentMethodIconSvg';
import AbstaractRadioButton from '../Abstract/abstractRadioButton';
const PaymentDetailMethod = ({
  Height,
  Width,
  Label,
  borderRadius,
  borderWidth,
  borderColor,
  borderBottomWidth,
  Value,
  backgroundColor,
  labelStyle,
}) => {
  const [options, SetOptions] = useState([
    {title: 'Online', id: 1, pressed: true},
    {title: 'Cash', id: 2, pressed: false},
  ]);
  const defaultHeight = Height ? Height : 50;
  const defaultWidth = Width ? Width : '100%';
  const defaultLabel = Label ? Label : 'TextInput';
  const defaultBorderBottomWidth = borderBottomWidth ? borderBottomWidth : null;
  const defaultBorderColor = borderColor ? borderColor : lightThemeColors.grey1;
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : lightThemeColors.white;
  const defaultLabelStyle = labelStyle ? labelStyle : styles.labelStyle;

  return (
    <View
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
          <PaymentMethodIconSvg />
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
              //   backgroundColor: 'red',
              width: '90%',

              borderBottomWidth: defaultBorderBottomWidth,
              borderColor: defaultBorderColor,
            },
          ]}>
          <View
            style={{
              width: 190,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // backgroundColor: 'yellow',
            }}>
            <AbstaractRadioButton options={options} setOPtions={SetOptions} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PaymentDetailMethod;

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
    fontSize: 16,
    color: lightThemeColors.grey1,
  },
  textInput: {
    height: '100%',
    width: '100%',

    // backgroundColor: 'blue',
  },
});
