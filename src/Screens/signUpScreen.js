import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Fonts, lightThemeColors} from '../theme';
import AbstractTextInput from '../Components/Abstract/abstractTextInput';
import FocusAwareStatusBar from '../Components/Abstract/focusAwareStatusBar';
import AbstractButton from '../Components/Abstract/abstractButton';
import AuthController from '../Controller/authController';
import {useTheme} from '@react-navigation/native';
import ThemeController from '../Controller/themeController';
import AbstaractRadioButton from '../Components/Abstract/abstractRadioButton';
import ArrowLeftTailSvg from '../Assets/Icons/arrowleftTailSvg';
const SignUpScreen = ({navigation}) => {
  const [user, SetUser] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    role: 'admin',
  });
  const [options, SetOptions] = useState([
    {
      title: 'admin',
      id: 1,
      pressed: true,
    },
    {
      title: 'user',
      id: 2,
      pressed: false,
    },
  ]);
  const [validate, setValidate] = useState(false);
  const [resError, setResError] = useState('');
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
        return SetUser(prev => ({...prev, name: e})), nvalidations(e);

      case 'email':
        return SetUser(prev => ({...prev, email: e})), ValidateEmail(e);

      case 'password':
        return SetUser(prev => ({...prev, password: e})), ValidatePassword(e);

      default:
        return;
    }
  };

  const nvalidations = e => {
    let res = /^[a-z A-Z]+$/.test(e);
    if (res) {
      SetUser(prev => ({...prev, nameError: ''}));
    } else {
      SetUser(prev => ({...prev, nameError: 'Enter Valid Name'}));
    }
  };
  const ValidateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      SetUser(prev => ({...prev, emailError: ''}));
    } else {
      SetUser(prev => ({...prev, emailError: 'Enter Valid Email'}));
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
  const onSignUpButtonPressed = () => {
    setResError('');
    if (
      resError == '' &&
      user.nameError == '' &&
      user.emailError == '' &&
      user.passwordError == '' &&
      user.name != '' &&
      user.email != '' &&
      user.password != ''
    ) {
      setLoading(true);
      AuthController.handleSignupUser(
        user,

        e => {
          setLoading(false), setResError(e);
        },
      );
    }
  };

  return (
    <>
      <View style={[styles.main, {backgroundColor: colors.defaultBackground}]}>
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: '100%',
              height: '100%',
              // backgroundColor: 'green',
              justifyContent: 'flex-end',
              //   alignItems: 'center',
              paddingBottom: 20,
              paddingHorizontal: 10,
            }}>
            <ArrowLeftTailSvg color={colors.black} />
          </TouchableOpacity>
          <Text
            style={[
              styles.labelStyle,
              {color: colors.black, fontWeight: '900', fontSize: 20},
            ]}>
            SignUp
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
              validate={validate}
              validations={e => nvalidations(e)}
              errorMessage={user.nameError}
            />
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
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                // backgroundColor: 'yellow',
                // justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <Text
                style={[
                  styles.labelStyle,
                  {fontSize: 15, color: colors.grey1, marginLeft: 15},
                ]}>
                Role
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '60%',
                  justifyContent: 'space-between',
                  paddingHorizontal: 20,
                  // backgroundColor: 'green',
                }}>
                <AbstaractRadioButton
                  flexDirection={'row'}
                  options={options}
                  setOPtions={SetOptions}
                  onPress={title => SetUser(prev => ({...prev, role: title}))}
                />
              </View>
            </View>

            <AbstractButton
              backgroundColor={lightThemeColors.red1}
              height={50}
              title={loading ? null : 'SignUp'}
              titleStyle={{
                color: colors.white,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 16,
              }}
              renderRightIcon={() =>
                loading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : null
              }
              width={'100%'}
              borderRadius={30}
              onPress={onSignUpButtonPressed}
            />
            {resError != '' ? (
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
            ) : null}
          </View>
        </View>
      </View>
    </>
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
    justifyContent: 'center',
  },
  containerHorizontal: {
    height: 330,
    width: '100%',
    // backgroundColor: 'green',
    // alignItems: 'flex-end',
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
