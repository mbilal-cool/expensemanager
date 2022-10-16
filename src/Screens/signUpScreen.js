import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Fonts, lightThemeColors} from '../theme';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractButton from '../Components/Abstract/abstractButton';
import {useTheme} from '@react-navigation/native';

const SignUpScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <View style={[styles.main, {color: colors.defaultBackground}]}>
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
          SignUp
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={[styles.containerHorizontal]}>
          <AbstractTextInput
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={styles.labelStyle}
            type={'simple'}
            PlaceHolder={'Name'}
            placeholderTextColor={lightThemeColors.grey}
          />
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
            title={'SignUp'}
            titleStyle={{
              color: 'white',
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'100%'}
            borderRadius={30}
            onPress={() => navigation.navigate('LogInScreen')}
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

    // backgroundColor: colors.defaultBackground,
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 0.55,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  containerHorizontal: {
    height: 290,
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
