import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, lightThemeColors} from '../theme';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractButton from '../Components/Abstract/abstractButton';
import {useTheme} from '@react-navigation/native';
import ThemeController from '../Controller/themeController';
import AuthController from '../Controller/authController';
const LoginScreen = ({navigation}) => {
  const [user, SetUser] = useState({
    name: '',
    nameError: '',
    password: '',
    passwordError: '',
  });
  const [resError, setResError] = useState('error');
  const [loading, setLoading] = useState(false);
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
      case 'name':
        return SetUser(prev => ({...prev, name: e})), nameValidations(e);

      case 'password':
        return SetUser(prev => ({...prev, password: e})), ValidatePassword(e);

      default:
        return;
    }
  };

  const nameValidations = e => {
    let res = /^[a-z A-Z]+$/.test(e);
    if (res) {
      SetUser(prev => ({...prev, nameError: ''}));
    } else {
      SetUser(prev => ({...prev, nameError: 'Enter Valid Name'}));
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
    if (
      user.nameError == '' &&
      user.passwordError == '' &&
      user.name != '' &&
      user.password != ''
    ) {
      setLoading(true);

      AuthController.handleLogin(
        {username: user.name, password: user.password},
        res => {
          SetUser(prev => ({...prev, name: '', password: ''}));
          setLoading(res);
        },
        reserror => setResError(reserror),
      );
    }
  };
  return (
    <>
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
              justifyContent: 'center',
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
              PlaceHolder={'Name'}
              placeholderTextColor={lightThemeColors.grey}
              Value={user.name}
              onChangeText={e => onChangeText(e, 'name')}
              errorMessage={user.nameError}
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
              errorMessage={user.passwordError}
            />
            <AbstractButton
              backgroundColor={lightThemeColors.red1}
              height={50}
              title={loading ? null : 'LogIn'}
              titleStyle={{
                color: colors.white,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              renderRightIcon={() =>
                loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  false
                )
              }
              // iconMargin={10}
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
          <View
            style={[
              styles.containerHorizontal,
              {
                // backgroundColor: 'yellow',
                height: 60,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingLeft: 15,
              },
            ]}>
            <Text style={[styles.labelStyle, {color: colors.grey1}]}>
              Don't have an account?
            </Text>
            <AbstractButton
              backgroundColor={'transparent'}
              height={20}
              title={'SignUp'}
              titleStyle={{
                color: colors.red1,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 13,
              }}
              // iconMargin={10}
              width={'20%'}
              borderRadius={30}
              onPress={() => navigation.navigate('SignUpScreen')}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
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
    flex: 0.45,
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerHorizontal: {
    height: 230,
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
    fontSize: 13,
  },
});
