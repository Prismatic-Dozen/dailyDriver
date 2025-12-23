import React from 'react';

import {View} from 'react-native';
import Login from './components/Login';
import WelcomeScreen from './components/WelcomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserProvider} from './userContext'; // Import the UserProvider

export type RootStackParamList = {
  Login: undefined;
  Welcome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{headerShown: false}} // This hides the header for the Welcome screen
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
