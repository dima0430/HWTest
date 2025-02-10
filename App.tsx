import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import AppRouter from './src/router';

const App = () => (
  <SafeAreaProvider>
    <AppRouter />
  </SafeAreaProvider>
);

export default App;
