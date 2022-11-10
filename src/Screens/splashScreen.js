import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import AuthController from '../Controller/authController';
import {navigate} from '../Navigation/mainNavigation';
import RNBootSplash from 'react-native-bootsplash';

const SplashScreen = () => {
  useEffect(() => {
    AuthController.handleRestoreUserAndAuthenticate()
      .then(res => {
        if (res) {
          RNBootSplash.hide({fade: true});
          navigate('AppStack');
        } else {
          RNBootSplash.hide({fade: true});
          navigate('LogInScreen');
        }
      })
      .catch(err => {
        RNBootSplash.hide({fade: true});
        console.log(err);
        navigate('AuthStack');
      });
  }, []);

  return (
    <View style={styles.main}>
      <Image
        source={require('../Assets/Images/logo.png')}
        style={{height: 170, width: 170}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#293151',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
