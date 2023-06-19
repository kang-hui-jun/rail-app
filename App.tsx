import React from 'react';
import {AppProvider, useAuth} from './store';
import {AuthenticatedApp} from './AuthenticatedApp';
import {Login} from './pages/login';
import {View} from 'react-native';

const Store = () => {
  const context = useAuth();

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
