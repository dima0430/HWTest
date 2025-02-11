import * as React from 'react';
import {NavigationContainer, StaticParamList} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import DetailsScreen from '../screens/DetailsScreen';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();
export type RootStackParamList = StaticParamList<typeof Stack>;

const AppRouter = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppRouter;
