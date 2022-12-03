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
  const [username, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
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
        return setUserName(e), nameValidations(e);

      case 'password':
        return setPassword(e), ValidatePassword(e);

      default:
        return;
    }
  };

  const nameValidations = e => {
    let res = /^[a-z A-Z]+$/.test(e);
    if (res) {
      setNameError('');
    } else {
      setNameError('Enter Valid Name');
    }
  };
  const ValidatePassword = e => {
    if (e.length < 6) {
      setPasswordError('password should be 6 character long ');
    } else {
      setPasswordError('');
    }
  };

  const onLoginButtonPressed = () => {
    setResError('');
    if (!username && !password) {
      setNameError('*required feild!');
      setPasswordError('*required feild!');
    } else if (!username) {
      setNameError('*required feild!');
    } else if (!password) {
      setPasswordError('*required feild!');
    } else if (username != '' && password != '') {
      if (!/^[a-z A-Z]+$/.test(username)) {
        setNameError('Enter Valid Name');
      } else if (password.length < 6) {
        setPasswordError('password should be 6 character long ');
      } else {
        setLoading(true);
        AuthController.handleLogin({username, password}, res => {
          setLoading(false);
          if (res.success) {
            setUserName('');
            setPassword('');
          } else {
            setResError(res);
          }
        });
      }
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
          {/* <View style={[styles.containerHorizontal]}> */}
          <AbstractTextInput
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={[styles.labelStyle, {color: colors.black}]}
            type={'simple'}
            PlaceHolder={'Name'}
            placeholderTextColor={lightThemeColors.grey}
            Value={username}
            onChangeText={e => onChangeText(e, 'name')}
            errorMessage={nameError}
          />
          <AbstractTextInput
            password={true}
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={[styles.labelStyle, {color: colors.black}]}
            type={'simple'}
            PlaceHolder={'Password'}
            placeholderTextColor={lightThemeColors.grey}
            Value={password}
            onChangeText={e => onChangeText(e, 'password')}
            errorMessage={passwordError}
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
            width={'100%'}
            borderRadius={30}
            onPress={onLoginButtonPressed}
          />
          {resError ? (
            <Text
              style={[
                styles.labelStyle,
                {
                  color: colors.red1,
                  fontSize: 14,
                  alignSelf: 'center',
                  marginTop: 8,
                },
              ]}>
              {resError}
            </Text>
          ) : null}
          {/* </View> */}
          <View
            style={[
              // styles.containerHorizontal,
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingLeft: 15,
                paddingTop: 8,
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
    flex: 1,
    paddingTop: 50,
    // backgroundColor: 'red',
    // justifyContent: 'center',
    paddingHorizontal: 20,
  },
  containerHorizontal: {
    // height: 230,
    // width: '100%',
    flex: 1,
    // backgroundColor: 'green',
    // alignItems: 'flex-end',
    // justifyContent: 'space-between',
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
