import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {Fonts, lightThemeColors} from '../../theme';
import ArrowDownIconSvg from '../../Assets/Icons/arrowDownSvg';
import {useTheme} from '@react-navigation/native';
const HeaderDropDown = ({
  Height,
  Width,
  backgroundColor,
  borderWidth,
  borderColor,
  title,
  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultHeight = Height ? Height : 25;
  const defaultWidth = Width ? Width : 115;

  const defaultBorderWidth = borderWidth ? borderWidth : 0;
  const defaultBorderColor = borderColor ? borderColor : 0;

  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.darkBlue;

  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.dropDownContainer,
        {
          height: defaultHeight,
          minWidth: defaultWidth,
          // backgroundColor: 'green',
          // backgroundColor: defaultBackgroundColor,
          borderWidth: defaultBorderWidth,
          borderColor: defaultBorderColor,
        },
      ]}>
      <Text
        style={styles.labelStyle}>{`${title.month},\u0020 ${title.year}`}</Text>
      <View
        style={{
          paddingTop: 3,
          width: '10%',
          height: '100%',
          // backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ArrowDownIconSvg width={12} height={12} />
      </View>
    </TouchableOpacity>
  );
};

export default HeaderDropDown;

const styles = StyleSheet.create({
  dropDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 16,
    color: lightThemeColors.white,
    // marginLeft: 11,
  },
});
