import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, lightThemeColors} from '../theme';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractButton from '../Components/Abstract/abstractButton';
import {useTheme} from '@react-navigation/native';
import ThemeController from '../Controller/themeController';

const LoginScreen = ({navigation}) => {
  const [user, SetUser] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });
  const [resError, setResError] = useState('error');
  const [validate, setValidate] = useState(false);
  const [darkMode, setDarkMode] = useState();
  const {colors} = useTheme();
  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);
  const onChangeText = (e, type) => {
    switch (type) {
      case 'email':
        return SetUser(prev => ({...prev, email: e})), ValidateEmail(e);

      case 'password':
        return SetUser(prev => ({...prev, password: e})), ValidatePassword(e);

      default:
        return;
    }
  };

  const ValidateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      SetUser(prev => ({...prev, emailError: ''}));
    } else {
      SetUser(prev => ({...prev, emailError: 'Enter Valid Name'}));
    }
  };
  const ValidatePassword = e => {
    if (e.length < 6) {
      SetUser(prev => ({
        ...prev,
        passwordError: 'password should be 6 character long ',
      }));
    } else {
      SetUser(prev => ({...prev, passwordError: ''}));
    }
  };
  const onLoginButtonPressed = () => {
    setValidate(true);

    if (
      user.emailError == '' &&
      user.passwordError == '' &&
      user.email != '' &&
      user.password != ''
    ) {
      navigation.navigate('AppStack');
    } else return;
  };
  return (
    <SafeAreaView
      style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
      <FocusAwareStatusBar
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.defaultBackground}
        translucent={true}
      />
      <View
        style={[
          styles.containerHorizontal,
          {
            // backgroundColor: 'yellow',
            flex: 0.12,
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 0,
          },
        ]}>
        <Text
          style={[
            styles.labelStyle,
            {color: colors.black, fontWeight: '900', fontSize: 20},
          ]}>
          LogIn
        </Text>
      </View>
      <View style={styles.middleContainer}>
        <View style={[styles.containerHorizontal]}>
          <AbstractTextInput
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={[styles.labelStyle, {color: colors.black}]}
            type={'simple'}
            PlaceHolder={'Email'}
            placeholderTextColor={lightThemeColors.grey}
            Value={user.email}
            onChangeText={e => onChangeText(e, 'email')}
            validate={validate}
            validations={e => ValidateEmail(e)}
            errorMessage={user.emailError}
          />
          <AbstractTextInput
            password={true}
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={[styles.labelStyle, {color: colors.black}]}
            type={'simple'}
            PlaceHolder={'Password'}
            placeholderTextColor={lightThemeColors.grey}
            Value={user.password}
            onChangeText={e => onChangeText(e, 'password')}
            validate={validate}
            errorMessage={user.passwordError}
            validations={e => ValidatePassword(e)}
          />
          <AbstractButton
            backgroundColor={lightThemeColors.red1}
            height={50}
            title={'LogIn'}
            titleStyle={{
              color: colors.white,
              fontFamily: Fonts.interBold,
              fontWeight: '600',
              fontSize: 16,
            }}
            iconMargin={10}
            width={'100%'}
            borderRadius={30}
            onPress={onLoginButtonPressed}
          />
          {/* {resError != '' ? (
            <Text
              style={[
                styles.labelStyle,
                {
                  color: colors.red1,
                  position: 'absolute',
                  bottom: -20,
                  left: 17,
                  fontSize: 14,
                },
              ]}>
              Network Error, Try Again !
            </Text>
          ) : null} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    // paddingHorizontal: 20,
  },
  middleContainer: {
    flex: 0.4,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
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
