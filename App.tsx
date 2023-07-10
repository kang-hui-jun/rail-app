import React, {useState} from 'react';
import {AppProvider} from './store';
import {AuthenticatedApp} from './AuthenticatedApp';
import {View} from 'react-native';

function App(): JSX.Element {
  return (
    <AppProvider>
      <View style={{flex: 1}}>
        <AuthenticatedApp />
      </View>
    </AppProvider>
  );
}

export default App;
