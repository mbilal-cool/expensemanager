import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from '../expensemanager/src/utils/Redux/store';
import MainNavigation from './src/Navigation/mainNavigation';
import RNBootSplash from 'react-native-bootsplash';
const App = () => {
  useEffect(() => RNBootSplash.hide({fade: true}), []);
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
