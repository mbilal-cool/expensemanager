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
import AbstaractRadioButton from '../Components/Abstract/abstractRadioButton';
const SignUpScreen = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [roles, setRoles] = useState(['admin']);
  const [resError, setResError] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState();
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
      case 'email':
        return setEmail(e), ValidateEmail(e);
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
  const ValidateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setEmailError('');
    } else {
      setEmailError('Enter Valid Email');
    }
  };

  const onSignUpButtonPressed = () => {
    setResError('');
    if (!username && !email && !password) {
      setNameError('*required feild!');
      setPasswordError('*required feild!');
      setEmailError('*required feild!');
    } else if (!username) {
      setNameError('*required feild!');
    } else if (!email) {
      setEmailError('*required feild!');
    } else if (!password) {
      setPasswordError('*required feild!');
    } else if (username != '' && email != '' && password != '') {
      if (!/^[a-z A-Z]+$/.test(username)) {
        setNameError('Enter Valid Name');
      } else if (password.length < 6) {
        setPasswordError('password should be 6 character long ');
      } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailError('Enter Valid Email');
      } else {
        setLoading(true);
        setLoading(true);
        AuthController.handleSignupUser(
          {username, email, password, roles},

          res => {
            setLoading(false);
            if (res.success) {
              setUserName('');
              setEmail('');
              setPassword('');
            } else {
              // console.log('abbbb00', res);
              setResError(res);
            }
          },
        );
      }

      ///
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
              {color: colors.black, fontWeight: '900', fontSize: 19},
            ]}>
            SignUp
          </Text>
        </View>
        <View style={styles.middleContainer}>
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
            borderWidth={1}
            borderColor={lightThemeColors.grey}
            placeHolderTextStyle={[styles.labelStyle, {color: colors.black}]}
            type={'simple'}
            PlaceHolder={'email'}
            placeholderTextColor={lightThemeColors.grey}
            Value={email}
            onChangeText={e => onChangeText(e, 'email')}
            errorMessage={emailError}
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
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              // backgroundColor: 'yellow',
              // justifyContent: 'space-between',
              // marginTop: 15,
              marginBottom: 15,
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
                onPress={title => setRoles([title])}
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
              ) : (
                false
              )
            }
            width={'100%'}
            borderRadius={30}
            onPress={onSignUpButtonPressed}
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
              Allready Registered!?
            </Text>
            <AbstractButton
              backgroundColor={'transparent'}
              height={20}
              title={'LogIn'}
              titleStyle={{
                color: colors.red1,
                fontFamily: Fonts.interBold,
                fontWeight: '600',
                fontSize: 13,
              }}
              // iconMargin={10}
              width={'15%'}
              borderRadius={30}
              onPress={() => navigation.navigate('LogInScreen')}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
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
