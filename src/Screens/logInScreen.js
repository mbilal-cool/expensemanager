import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts, lightThemeColors} from '../theme';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractButton from '../Components/Abstract/abstractButton';
import {colors} from 'react-native-gifted-charts/src/PieChart/colors';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={styles.main}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.white}
        translucent={true}
      />
      <View
        style={[
          styles.containerHorizontal,
          {
            // backgroundColor: 'yellow',
            flex: 0.18,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 0,
          },
        ]}>
        <Text style={[styles.labelStyle, {fontWeight: '900', fontSize: 20}]}>
          LogIn
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={[styles.containerHorizontal]}>
          <AbstractTextInput
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={styles.labelStyle}
            type={'simple'}
            PlaceHolder={'Email'}
            placeholderTextColor={lightThemeColors.grey}
          />
          <AbstractTextInput
            password={true}
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={styles.labelStyle}
            type={'simple'}
            PlaceHolder={'Password'}
            placeholderTextColor={lightThemeColors.grey}
          />
          <AbstractButton
            backgroundColor={lightThemeColors.red1}
            height={50}
            title={'LogIn'}
            titleStyle={{
              color: 'white',
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'100%'}
            borderRadius={30}
            onPress={() => navigation.navigate('BottomTabs')}
          />
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 0.4,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  containerHorizontal: {
    height: 200,
    width: '100%',
    // backgroundColor: 'green',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '700',
    fontSize: 20,
    color: lightThemeColors.black,
  },
  labelStyle: {
    fontFamily: Fonts.interBold,
    fontWeight: '500',
    color: lightThemeColors.black,
    fontSize: 16,
  },
});
