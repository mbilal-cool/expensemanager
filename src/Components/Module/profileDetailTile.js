import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {lightThemeColors, Fonts} from '../../theme';

const ProfileDetailTile = ({
  height,

  backgroundColor,

  onPress = () => false,
}) => {
  const {colors} = useTheme();
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : 'transparent';
  const defaultHeight = height ? height : 50;
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[
        styles.Tile,
        {
          height: defaultHeight,
          backgroundColor: defaultBackgroundColor,
        },
      ]}>
      <View style={styles.circle}>
        <Image
          source={require('../../Assets/Images/profile.png')}
          style={styles.circle}></Image>
      </View>
      <Text style={[styles.itemTextStyle, {color: colors.black}]}>
        Frank Castle
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileDetailTile;
const styles = StyleSheet.create({
  Tile: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: lightThemeColors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemTextStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '600',
    fontSize: 20,
    color: lightThemeColors.black,
    marginLeft: 10,
  },
  circle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: lightThemeColors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
