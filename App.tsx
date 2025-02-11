import {SafeAreaProvider} from 'react-native-safe-area-context';
import React from 'react';
import AppRouter from './src/router';
import {ConfigProvider} from './src/context';

const App = () => (
  <ConfigProvider>
    <SafeAreaProvider>
      <AppRouter />
    </SafeAreaProvider>
  </ConfigProvider>
);

export default App;
