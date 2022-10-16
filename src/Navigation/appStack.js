import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
const Stack = createStackNavigator();
import CustomBottomTabNavigation from './customBottomTabNavigation';
import Search from '../Screens/search';
import OneTimeExpense from '../Screens/oneTimeExpense';
import Catalog from '../Screens/catalog';
import EntryDetails from '../Screens/detailEntry';
import ExpenseType from '../Screens/expenseType';
import ShowAllExpenses from '../Screens/showAllExpenses';
import Users from '../Screens/message';
import AuthStack from './authStack';
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={AuthStack} name={'AuthStack'} />

      <Stack.Screen component={CustomBottomTabNavigation} name={'BottomTabs'} />

      <Stack.Screen
        component={Search}
        name={'Search'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        component={OneTimeExpense}
        name={'OneTimeExpense'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        component={Users}
        name={'Users'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        component={ExpenseType}
        name={'ExpenseType'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        component={ShowAllExpenses}
        name={'ShowAllExpenses'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        component={EntryDetails}
        name={'EntryDetails'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        component={Catalog}
        name={'Catalog'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
