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
import AddCatelog from '../Screens/addCatlog';
import RecurringExpense from '../Screens/recurringExpense.js';
import EntryDetails from '../Screens/detailEntry';
import ExpenseType from '../Screens/expenseType';
import ShowAllExpenses from '../Screens/showAllExpenses';
import Setting from '../Screens/setting';
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={CustomBottomTabNavigation} name={'BottomTabs'} />

      <Stack.Screen
        component={Setting}
        name={'Setting'}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
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
        component={RecurringExpense}
        name={'RecurringExpense'}
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
      <Stack.Screen
        component={AddCatelog}
        name={'AddCatelog'}
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
