import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AbstractBottomSheet from '../Abstract/abstractBottomSheet';
import {Fonts, lightThemeColors} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AbstractDropDown from '../Abstract/abstaractDropDown';
import AbstaractRadioButton from '../Abstract/abstractRadioButton';
const SelectExpensesDateBottomSheet = ({onPress, id}) => {
  const [options, SetOptions] = useState([
    {id: 1, title: 'May', pressed: true},
    {id: 1, title: 'April', pressed: false},
    {id: 1, title: 'March', pressed: false},
    {id: 1, title: 'Feburary', pressed: false},

    {id: 1, title: 'January', pressed: false},
  ]);
  return (
    <View>
      <AbstractBottomSheet id={id} appendButton={true}>
        <View style={styles.main}>
          <View
            style={[styles.containerHorizontal, {backgroundColor: 'tomato'}]}>
            <AbstractDropDown
              type={'pressable'}
              borderRadius={30}
              backgroundColor={'green'}
            />
          </View>

          <View
            style={[
              styles.containerHorizontal,
              {
                height: 210,
                alignItems: 'flex-start',
                // backgroundColor: 'red',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              },
            ]}>
            <View style={styles.radioContainerColumn}>
              <AbstaractRadioButton
                options={options}
                setOPtions={SetOptions}
                width={90}
                titleStyle={[styles.titleStyle, {fontSize: 14, marginLeft: 13}]}
              />
            </View>
          </View>
        </View>
      </AbstractBottomSheet>
    </View>
  );
};

export default SelectExpensesDateBottomSheet;

const styles = StyleSheet.create({
  main: {
    minHeight: 309,
    width: '100%',
    // backgroundColor: 'red',
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    backgroundColor: 'green',
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
    height: '100%',
    // backgroundColor: 'yellow',
    width: 200,
    justifyContent: 'space-between',
    paddingTop: 20,
  },
});
