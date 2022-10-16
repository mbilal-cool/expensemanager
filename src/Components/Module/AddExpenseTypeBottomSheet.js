import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AbstractBottomSheet from '../Abstract/abstractBottomSheet';
import {Fonts, lightThemeColors} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AbstractButton from '../Abstract/abstractButton';
import AbstractTextInput from '../Abstract/abstractTextInput';

const AddExpenseTypeBotttomSheet = ({onPress, id}) => {
  return (
    <View>
      <AbstractBottomSheet id={id} appendButton={true}>
        <View style={styles.main}>
          <View
            style={[
              styles.containerHorizontal,
              {
                // backgroundColor: 'yellow',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              },
            ]}>
            <AbstractTextInput
              borderWidth={1}
              borderColor={lightThemeColors.grey}
              Label={'ExpenseType'}
              placeHolderTextStyle={styles.labelStyle}
              type={'simple'}
              PlaceHolder={'Type'}
              placeholderTextColor={lightThemeColors.grey}
            />
          </View>
        </View>
      </AbstractBottomSheet>
    </View>
  );
};

export default AddExpenseTypeBotttomSheet;

const styles = StyleSheet.create({
  main: {
    height: 110,
    width: '100%',
    // backgroundColor: 'red',
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: 90,
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '700',
    fontSize: 20,
    color: lightThemeColors.black,
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: 500,
    color: lightThemeColors.grey,
    fontSize: 16,
  },
});
