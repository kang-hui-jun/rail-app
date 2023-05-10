/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {AppProvider, useAuth} from './store';
import {AuthenticatedApp} from './AuthenticatedApp';
import {Login} from './pages/login';
import {View} from 'react-native';

const Store = () => {
  const context = useAuth();
  console.log(context?.user);

  return (
    <View style={{flex: 1}}>
      {context?.user ? <AuthenticatedApp /> : <Login />}
    </View>
  );
};

function App(): JSX.Element {
  return (
    <AppProvider>
      <Store />
    </AppProvider>
  );
}

export default App;
