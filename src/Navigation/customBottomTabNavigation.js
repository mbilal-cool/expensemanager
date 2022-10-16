import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/home';
import Expenses from '../Screens/expenses';
import MoreScreen from '../Screens/moreScreen';
import CustomBottomTabBar from './TabBarConfigs/customBottomTabBar';
const CustomBottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarShowLabel: false}}
      initialRouteName={'Home'}
      tabBar={props => <CustomBottomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Expenses" component={Expenses} />
      <Tab.Screen name="MoreScreen" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default CustomBottomTabNavigation;

const styles = StyleSheet.create({});
