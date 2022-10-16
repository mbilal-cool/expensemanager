import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import AbstractBottomSheet from '../Abstract/abstractBottomSheet';
import {Fonts, lightThemeColors} from '../../theme';

import AbstractButton from '../Abstract/abstractButton';
import AbstaractRadioButton from '../Abstract/abstractRadioButton';
import {useTheme} from '@react-navigation/native';
import {expenseList} from '../../mockData';

const ExpensesBottomSheet = ({onPress, id, reportType, setReportType}) => {
  const {colors} = useTheme();

  const [options, SetOptions] = useState([
    {id: 1, title: 'All', pressed: true},
    {id: 1, title: 'Today', pressed: false},
    {id: 1, title: 'This Week', pressed: false},
    {id: 1, title: 'Last Week', pressed: false},
  ]);

  const onReportDurationRadioPressed = title => {
    console.log(title);
    onPress(title);
    SheetManager.hide(id);
  };

  const onClose = () => {
    setReportType('reportDuration');
  };
  const selectBottomSheetType = type => {
    switch (type) {
      case 'reportDuration':
        return (
          <View style={styles.main}>
            <View style={styles.containerHorizontal}>
              <Text style={[styles.titleStyle, {color: colors.black}]}>
                ReportDuration
              </Text>
            </View>
            <View
              style={[
                styles.containerHorizontal,
                {
                  height: 150,
                  alignItems: 'flex-start',
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                },
              ]}>
              <View style={styles.radioContainerColumn}>
                <AbstaractRadioButton
                  onPress={title => onReportDurationRadioPressed(title)}
                  options={options}
                  setOPtions={SetOptions}
                  width={90}
                  titleStyle={[
                    styles.titleStyle,
                    {fontSize: 14, marginLeft: 13},
                  ]}
                />
              </View>
            </View>
          </View>
        );

      case 'deleteEntry':
        return (
          <View style={[styles.main, {height: 190, paddingTop: 20}]}>
            <View
              style={[
                styles.containerHorizontal,
                {
                  // backgroundColor: 'yellow',
                  justifyContent: 'center',
                  height: 60,
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  styles.titleStyle,
                  {
                    color: colors.black,
                    fontFamily: Fonts.interBold,
                    fontWeight: '700',
                    fontSize: 20,
                  },
                ]}>
                Are You Sure?
              </Text>
            </View>
            <View
              style={[
                styles.containerHorizontal,
                {
                  // backgroundColor: 'yellow',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  height: 60,

                  alignItems: 'center',
                },
              ]}>
              <AbstractButton
                borderWidth={1}
                borderColor={colors.red2}
                backgroundColor={'transparent'}
                height={40}
                title={'Delete'}
                titleStyle={{
                  color: colors.red2,
                  fontFamily: Fonts.interBold,
                  fontWeight: '600',
                  fontSize: 16,
                }}
                iconMargin={10}
                width={'48%'}
                borderRadius={30}
                onPress={() => {
                  onPress[0]();
                }}
              />
              <AbstractButton
                backgroundColor={colors.black}
                height={40}
                title={'cancel'}
                titleStyle={{
                  color: colors.white,
                  fontFamily: Fonts.interBold,
                  fontWeight: '600',
                  fontSize: 16,
                }}
                iconMargin={10}
                width={'48%'}
                borderRadius={30}
                onPress={() => onPress[1]()}
              />
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.main}>
            <View style={styles.containerHorizontal}>
              <Text style={[styles.titleStyle, {color: colors.black}]}>
                Duration
              </Text>
            </View>
            <View
              style={[
                styles.containerHorizontal,
                {
                  height: 150,
                  alignItems: 'flex-start',
                  // backgroundColor: 'red',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                },
              ]}>
              <View style={styles.radioContainerColumn}>
                <AbstaractRadioButton
                  onPress={onPress}
                  options={options}
                  setOPtions={SetOptions}
                  width={90}
                  titleStyle={[
                    styles.titleStyle,
                    {fontSize: 14, marginLeft: 13},
                  ]}
                />
              </View>
            </View>
          </View>
        );
    }
  };

  return (
    <View>
      <AbstractBottomSheet id={id} onClose={onClose}>
        {selectBottomSheetType(reportType)}
      </AbstractBottomSheet>
    </View>
  );
};

export default ExpensesBottomSheet;

const styles = StyleSheet.create({
  main: {
    minHeight: 269,
    width: '100%',
    // backgroundColor: 'red',
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    fontSize: 16,
    color: lightThemeColors.black,
  },
  radioContainerColumn: {
    height: 131,
    // backgroundColor: 'yellow',
    width: 200,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
});
