import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';

import {lightThemeColors, Fonts} from '../../theme';

const AbstractHeader = ({
  height,
  width,
  backgroundColor,
  removeMiddle,
  leftColWidth,
  middleColWidth,
  rightColWidth,
  renderRightItem = () => false,
  renderLeftItem = () => false,
  renderMiddleItem = () => false,
  onLeftItemPress = () => false,
  onRightItemPress = () => false,
}) => {
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : lightThemeColors.darkBlue;
  const defaultHeight = height ? height : 80;

  return (
    <View
      style={[
        styles.main,
        {
          height: defaultHeight,
          backgroundColor: defaultBackgroundColor,
          // backgroundColor: 'green',
          paddingTop: 15,
        },
      ]}>
      <View style={styles.contentTile}>
        <TouchableOpacity
          onPress={() => onLeftItemPress}
          style={[styles.col, {width: leftColWidth ? leftColWidth : '20%'}]}>
          {renderLeftItem ? renderLeftItem() : null}
        </TouchableOpacity>
        {removeMiddle === true ? null : (
          <View
            style={[
              styles.col,
              {
                width: middleColWidth ? middleColWidth : '60%',

                alignItems: 'center',
                justifyContent: 'flex-start',
              },
            ]}>
            {renderMiddleItem ? renderMiddleItem() : null}
          </View>
        )}
        <TouchableOpacity
          onPress={() => onRightItemPress()}
          style={[
            styles.col,
            {
              width: rightColWidth ? rightColWidth : '20%',
              alignItems: 'flex-end',
            },
          ]}>
          {renderRightItem ? renderRightItem() : null}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AbstractHeader;
const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',

    width: '100%',

    // paddingHorizontal: 15,
    // paddingVertical: 15,
    alignItems: 'center',
  },
  col: {
    height: '100%',

    // backgroundColor: 'green',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // borderRadius: 10,
  },
  profileContainer: {
    height: 37,
    width: 37,
    borderRadius: 20,
    // backgroundColor: 'tomato',
  },
  contentTile: {
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    // backgroundColor: 'orange',
    justifyContent: 'space-between',

    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: 10,
  },
  textstyl: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 14,
    color: lightThemeColors.black,
  },
  shadowProp: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 14, height: 20},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
