/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createCompatNavigatorFactory } from '@react-navigation/compat';
import  React from 'react';

import Colors from './src/core/colors';
import HomeScreen from './src/navigation/HomeScreen';
import LoginScreen from './src/navigation/LoginScreen';
import AuthLoadingScreen from './src/navigation/AuthLoadingScreen';

const Stack = createStackNavigator()

function AppStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={HomeScreen} options={{
        title:'ORDENES',
        headerLeft: ()=> null,
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primaryColor
        },
      }} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
}

const SwitchNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
);

function App() {
    return (
      <NavigationContainer >
        <SwitchNavigator/> 
      </NavigationContainer>
    );
}

export default App;