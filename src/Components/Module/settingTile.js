import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

import {lightThemeColors, Fonts} from '../../theme';
import AbstractSwitch from '../Abstract/abstractSwitch';
import {useTheme} from '@react-navigation/native';

const SettingTile = ({
  Height,
  renderIconLeft,
  settingTitle,
  backgroundColor,
  darkModeSwitch,
  onPress = () => false,
}) => {
  const {height, width} = Dimensions.get('window');
  const {colors} = useTheme();
  const [sliderPressed, setSliderPressed] = useState(false);
  const defaultSettingTitle = settingTitle ? settingTitle : 'DarkvMode';
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.defaultBackgroundColor;
  const defaultHeight = Height ? Height : height * 0.05;
  return (
    <TouchableOpacity
      disabled={darkModeSwitch ? true : false}
      onPress={() => onPress()}
      style={[
        styles.Tile,
        {
          height: defaultHeight,
          // backgroundColor: 'green',
          justifyContent: 'space-between',
        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //   backgroundColor: 'green',
        }}>
        <View style={styles.circle}>
          {renderIconLeft ? renderIconLeft() : null}
        </View>
        <Text style={[styles.itemTextStyle, {color: colors.black}]}>
          {defaultSettingTitle}
        </Text>
      </View>
      {darkModeSwitch ? <AbstractSwitch /> : null}
    </TouchableOpacity>
  );
};

export default SettingTile;
const styles = StyleSheet.create({
  Tile: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: lightThemeColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 16,
    color: lightThemeColors.black,
    marginLeft: 10,
  },
  circle: {
    height: 30,
    width: 30,
    borderRadius: 25,
    backgroundColor: lightThemeColors.pink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  sliderBtnContainer: {
    height: 17,
    width: 30,
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 2,
  },
});
