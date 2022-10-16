import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const AbstractBottomTabButton = ({
  Icon,
  Label,
  onPress = () => false,
  labelColor,
  isFocused,
}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.main}>
      {Icon ? Icon() : null}
      {isFocused ? (
        <Text
          style={[
            styles.labelStyle,
            {color: labelColor ? labelColor : lightThemeColors.red1},
          ]}>
          {Label ? Label : 'pressme'}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default AbstractBottomTabButton;

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '600',
    color: lightThemeColors.red1,
    marginTop: 5,
  },
});
