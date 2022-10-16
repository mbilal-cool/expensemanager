import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from '../expensemanager/src/utils/Redux/store';
import MainNavigation from './src/Navigation/mainNavigation';

// RNBootSplash.hide(); // immediate
const App = () => {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;
