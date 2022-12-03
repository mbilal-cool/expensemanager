import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useColorScheme} from 'react-native';
import ThemeController from '../Controller/themeController';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();
import AppStack from './appStack';
import AuthStack from './authStack';
import {lightThemeColors, darkThemeColors} from '../theme';
import {useSelector} from 'react-redux';

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

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

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
    <NavigationContainer theme={appTheme} ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={AuthStack} name={'AuthStack'} />
        <Stack.Screen component={AppStack} name={'AppStack'} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
