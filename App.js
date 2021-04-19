/* eslint-disable prettier/prettier */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';

import HomeScreen from './src/navigation/HomeScreen';
import ProfileScreen from './src/navigation/ProfileScreen';
import LoginScreen from './src/navigation/LoginScreen';
import FideicomisoScreen from './src/navigation/FideicomisoScreen';
import FideicomisoDetailScreen from './src/navigation/FideicomisoDetailScreen';
import SyncScreen from './src/navigation/SyncScreen';
import ProgramaScreen from './src/navigation/ProgramaScreen';
import IndicadoresScreen from './src/navigation/IndicadoresScreen';
import Colors  from './src/core/colors';
import {Image} from 'react-native';
import AuthLoadingScreen from './src/navigation/AuthLoadingScreen';

const AppStack = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Profile: {screen: ProfileScreen},
    Fideicomiso: {screen: FideicomisoScreen},
    FideicomisoDetail: {screen: FideicomisoDetailScreen},
    Programa: {screen: ProgramaScreen},
    Indicadores: {screen: IndicadoresScreen},
  },
  {
    transitionConfig: getSlideFromRightTransition,
    defaultNavigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primaryColor },
      headerLayoutPreset: 'center',
      headerBackTitle: 'Atrás',
    },
  }
);
const AuthStack = createStackNavigator(
  {
    Login: {screen: LoginScreen},
    Sync: {screen: SyncScreen},
  },  
  {
    transitionConfig: getSlideFromRightTransition,
    defaultNavigationOptions: {
      headerTintColor: 'white',
      headerStyle: { backgroundColor: Colors.primaryColor },
      headerLayoutPreset: 'center',
      headerBackTitle: 'Atrás',
    },
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default createAppContainer(SwitchNavigator);
