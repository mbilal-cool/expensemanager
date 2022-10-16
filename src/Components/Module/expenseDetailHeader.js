import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import AbstractButton from '../Abstract/abstractButton';
import {Fonts} from '../../theme';
import PdfIconSvg from '../../Assets/Icons/pdfSvg';
import {useTheme} from '@react-navigation/native';

const ExpenseDetailHeader = ({
  height,
  width,
  backgroundColor,
  borderWidth,
  borderColor,
  titleStyle,
  headingMain,
  paddingHorizontal,
  currentDate,
  downLoad,
  onDownloadPress = () => false,
}) => {
  const {colors} = useTheme();
  const headings = [
    {title: 'Date'},
    {title: 'Name'},
    {title: 'Type'},
    {title: 'Amount'},
  ];
  const defaultBackgroundColor = backgroundColor
    ? backgroundColor
    : colors.white;
  const defaultHeight = height ? height : 24;
  const defaultPaddingHorizontal = paddingHorizontal ? paddingHorizontal : 20;
  //   const defaultHeadings = headings
  //     ? headings
  //     : {item1: 'Year', item2: 'Amount', item3: 'status'};
  return (
    <View
      style={[
        styles.main,
        {
          minHeight: defaultHeight,
          backgroundColor: defaultBackgroundColor,
        },
      ]}>
      {headingMain ? (
        <View
          style={[styles.Tile, {paddingHorizontal: defaultPaddingHorizontal}]}>
          <View
            style={[styles.col, {alignItems: 'center', flexDirection: 'row'}]}>
            <Text style={[styles.textStyle, {color: colors.black}]}>
              {headingMain}
            </Text>
            {currentDate ? (
              <Text
                style={[styles.textStyle, {fontSize: 14, color: colors.grey1}]}>
                {` (${currentDate})`}
              </Text>
            ) : null}
          </View>
          {downLoad === true ? (
            <View style={styles.col}>
              <AbstractButton
                backgroundColor={'transparent'}
                height={20}
                width={120}
                title={'Download'}
                titleStyle={{
                  color: lightThemeColors.black,
                  fontFamily: Fonts.interBold,
                  fontWeight: '500',
                  fontSize: 12,
                }}
                iconMargin={10}
                borderRadius={30}
                onPress={onDownloadPress}
                renderRightIcon={() => <PdfIconSvg />}
              />
            </View>
          ) : null}
        </View>
      ) : null}
      <View
        style={[
          styles.Tile,
          {height: 24, backgroundColor: colors.grey4, paddingHorizontal: 20},
        ]}>
        {headings.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.col,
                {
                  flex: 1,
                  height: '100%',
                  // backgroundColor: index % 2 == 0 ? 'red' : 'cyan',
                  alignItems: index === 0 ? 'flex-start' : 'center',
                  paddingLeft: index === 0 ? 10 : null,
                  // alignItems: 'center',
                },
              ]}>
              <Text style={[styles.titleStyle, {color: colors.grey1}]}>
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ExpenseDetailHeader;
const styles = StyleSheet.create({
  main: {
    width: '100%',

    justifyContent: 'space-between',
    alignItems: 'center',
  },
  col: {
    height: '100%',

    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 10,
  },
  profileContainer: {
    height: 37,
    width: 37,
    borderRadius: 20,
    // backgroundColor: 'tomato',
  },
  Tile: {
    flexDirection: 'row',
    height: 22,
    width: '100%',
    // backgroundColor: lightThemeColors.white,
    justifyContent: 'space-between',

    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 18,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 10,
  },
  shadowProp: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {width: 14, height: 20},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
