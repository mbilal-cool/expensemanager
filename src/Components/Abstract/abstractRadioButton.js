import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, lightThemeColors} from '../../theme';
import {useTheme} from '@react-navigation/native';
const AbstaractRadioButton = ({
  reverse,
  height,
  width,
  options,

  onPress = () => false,
  bR,
  justifyContent,
  flexDirection,
  tintColor,
  backgroundColor,
  titleStyle,
}) => {
  const [radioArray, setRadioArray] = useState(options);
  const {colors} = useTheme();
  const defaultTitleStyle = titleStyle ? titleStyle : styles.titleStyle;
  const defaultHeight = height ? height : 25;
  const defaultWidth = width ? width : 68;
  const defaultFlexDirection = flexDirection ? flexDirection : 'row';

  const defaultTintColor = tintColor ? tintColor : lightThemeColors.blue;
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : lightThemeColors.blue;
  useEffect(() => {
    setRadioArray(options);
  }, [options]);
  const changePressBoxValue = pIndex => {
    let mArray = radioArray.map((item, index) => {
      if (index === pIndex) {
        if (item.pressed === false) {
          return {...item, pressed: true};
        }
        return {...item, pressed: false};
      } else {
        return {...item, pressed: false};
      }
    });
    setRadioArray(mArray);
  };
  return radioArray?.map((item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          changePressBoxValue(index), onPress(item.title);
        }}
        key={index}
        style={{
          height: defaultHeight,
          width: defaultWidth,
          flexDirection: defaultFlexDirection,
          justifyContent: justifyContent,
        }}>
        {reverse ? (
          <>
            <Text
              style={[defaultTitleStyle, {color: colors.black, marginLeft: 0}]}>
              {item.title}
            </Text>
            <View style={[styles.tintStyle, {borderColor: defaultTintColor}]}>
              {item.pressed === true ? (
                <View
                  style={[
                    styles.radioStyle,
                    {backgroundColor: defaultBackgroundColor},
                  ]}></View>
              ) : null}
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                changePressBoxValue(index), onPress(item.title);
              }}
              style={[styles.tintStyle, {borderColor: defaultTintColor}]}>
              {item.pressed === true ? (
                <View
                  style={[
                    styles.radioStyle,
                    {backgroundColor: defaultBackgroundColor},
                  ]}></View>
              ) : null}
            </TouchableOpacity>
            <Text style={[defaultTitleStyle, {color: colors.black}]}>
              {item.title}
            </Text>
          </>
        )}
      </TouchableOpacity>
    );
  });
};

export default AbstaractRadioButton;

const styles = StyleSheet.create({
  tintStyle: {
    height: 16,
    width: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    backgroundColor: lightThemeColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioStyle: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.black,
    marginLeft: 10,
  },
});
