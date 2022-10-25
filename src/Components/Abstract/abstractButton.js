import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {lightThemeColors, Fonts} from '../../theme';
const AbstractButton = ({
  height,
  width,
  backgroundColor,
  borderRadius,
  borderWidth,
  borderColor,
  title = false,
  titleStyle,
  onPress = () => false,
  renderRightIcon,
  renderLeftIcon,
  iconMargin,
}) => {
  const defaultHeight = height ? height : 50;
  const defaultWidth = width ? width : '100%';
  const defaultTitle = title ? title : null;
  const defaultBorderWidth = borderWidth ? borderWidth : 0;
  const defaultBorderRadius = borderRadius ? borderRadius : 0;
  const defaultBorderColor = borderColor ? borderColor : 0;
  const defaultTitleStyle = titleStyle ? titleStyle : styles.titleStyle;
  const defaultIconMargin = iconMargin ? iconMargin : 5;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.buttonStyle,
        {
          height: defaultHeight,
          width: defaultWidth,
          borderRadius: defaultBorderRadius,
          borderColor: defaultBorderColor,
          borderWidth: defaultBorderWidth,
          backgroundColor: backgroundColor
            ? backgroundColor
            : lightThemeColors.red1,
        },
      ]}>
      <View
        style={[
          styles.iconStyle,
          {marginRight: title ? defaultIconMargin : null},
        ]}>
        {renderLeftIcon ? renderLeftIcon() : null}
      </View>

      <Text style={defaultTitleStyle}>{defaultTitle}</Text>
      <View
        style={[
          styles.iconStyle,
          {marginLeft: title ? defaultIconMargin : null},
        ]}>
        {renderRightIcon ? renderRightIcon() : null}
      </View>
    </TouchableOpacity>
  );
};

export default AbstractButton;
const styles = StyleSheet.create({
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontSize: 16,
    fontWeight: '600',
    color: lightThemeColors.white,
  },
  iconStyle: {
    justifyContent: 'center',
    alignSelf: 'center',
    // marginBottom: 5,
    // backgroundColor: 'blue',
  },
});
