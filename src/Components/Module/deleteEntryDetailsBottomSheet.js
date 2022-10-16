import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AbstractBottomSheet from '../Abstract/abstractBottomSheet';
import {Fonts, lightThemeColors} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AbstractButton from '../Abstract/abstractButton';
const DeleteEntryDetailsBottomSheet = ({onPress, id}) => {
  return (
    <View>
      <AbstractBottomSheet id={id}>
        <View style={styles.main}>
          <View style={styles.containerHorizontal}>
            <Text style={styles.titleStyle}>Are You Sure?</Text>
          </View>
          <View
            style={[
              styles.containerHorizontal,
              {
                // backgroundColor: 'yellow',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              },
            ]}>
            <AbstractButton
              borderWidth={1}
              borderColor={lightThemeColors.red1}
              backgroundColor={'transparent'}
              height={40}
              title={'Delete'}
              titleStyle={{
                color: lightThemeColors.red1,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              iconMargin={10}
              width={170}
              borderRadius={30}
              //   onPress={handleSheet}
            />
            <AbstractButton
              backgroundColor={lightThemeColors.black}
              height={40}
              title={'cancel'}
              titleStyle={{
                color: lightThemeColors.white,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              iconMargin={10}
              width={170}
              borderRadius={30}
              //   onPress={handleSheet}
            />
          </View>
        </View>
      </AbstractBottomSheet>
    </View>
  );
};

export default DeleteEntryDetailsBottomSheet;

const styles = StyleSheet.create({
  main: {
    height: 200,
    width: '100%',
    // backgroundColor: 'red',
  },
  containerHorizontal: {
    flexDirection: 'row',
    height: 70,
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
});
