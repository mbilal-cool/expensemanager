import {StyleSheet, Text, View, useEffect} from 'react-native';
import React from 'react';
import AuthController from '../Controller/authController';
import {navigate} from '../Navigation/mainNavigation';

const SplashScreen = () => {
  useEffect(() => {
    AuthController.handleRestoreUserAndAuthenticate()
      .then(res => {
        if (res.status) {
          RNBootSplash.hide({fade: true});
          navigate('home');
        } else {
          RNBootSplash.hide({fade: true});
          navigate('auth');
        }
      })
      .catch(err => {
        RNBootSplash.hide({fade: true});
        console.log(err);
        navigate('auth');
      });
  }, []);

  return (
    <View>
      <Text>splashScreen</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
