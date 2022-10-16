import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import ThemeController from '../Controller/themeController';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import AppStack from './appStack';
import AuthStack from './authStack';
import {lightThemeColors, darkThemeColors} from '../theme';

const MyDarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...darkThemeColors,
  },
};

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...lightThemeColors,
  },
};
const MainNavigation = () => {
  const [darkMode, setDarkMode] = useState(false);
  const appTheme = darkMode ? MyDarkTheme : MyDefaultTheme;

  useEffect(() => {
    ThemeController.checkAsyncAndSetPreviousMode();
    ThemeController.listeningToChange(data => {
      setDarkMode(data);
    });
    return () => {
      ThemeController.removingListener();
    };
  }, []);

  return (
    <NavigationContainer theme={appTheme}>
      <AppStack />
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
