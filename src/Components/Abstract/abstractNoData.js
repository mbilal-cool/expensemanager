import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../../theme';
const AbstractNoData = ({height, width, caption1, caption, captionStyle}) => {
  const {colors} = useTheme();
  const defaultHeight = height ? height : 150;
  const defaultWidth = width ? width : '100%';
  const defaultTitle = caption
    ? caption
    : 'Add expense or clients to show enteries';
  const defaultCaptionStyle = captionStyle ? captionStyle : styles.titleStyle;
  return (
    <View
      style={[styles.Wrapper, {height: defaultHeight, width: defaultWidth}]}>
      <Image
        style={styles.imageStyle}
        source={require('../../Assets/Images/noData.png')}></Image>
      <Text style={[defaultCaptionStyle, {color: colors.grey1}]}>
        {defaultTitle}
      </Text>
      <Text style={[defaultCaptionStyle, {color: colors.grey1}]}>
        {caption1}
      </Text>
    </View>
  );
};

export default AbstractNoData;

const styles = StyleSheet.create({
  Wrapper: {
    // backgroundColor: 'red',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: Fonts.interRegular,
    fontSize: 14,
    fontWeight: '400',
    color: lightThemeColors.grey1,
  },
  imageStyle: {
    height: 133,
    width: 137,
  },
});
