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
import { TransitionPresets } from '@react-navigation/stack';
import  React from 'react';

import Colors from './src/core/colors';
import Home from './src/navigation/screens/Home';
import OrderDetail from './src/navigation/screens/OrderDetail';
import OrderProgress from './src/navigation/screens/OrderProgress'
import Login from './src/navigation/screens/Login';
import Sync from './src/navigation/screens/Sync';
import AuthLoading from './src/navigation/screens/AuthLoading';
import AddTimeControl from './src/navigation/modals/AddTimeControl';
import AddFuelControl from './src/navigation/modals/AddFuelControl';
import AddNonWorkingHours from './src/navigation/modals/AddNonWorkingHours'
import AddOrderProgress from './src/navigation/modals/AddOrderProgress'
import PickerView from './src/navigation/modals/PickerView'
import Profile from './src/navigation/screens/Profile';

const Stack = createStackNavigator()

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Sync">
      <Stack.Screen name="Sync" component={Sync} options={{
        title:'SINCRONIZANDO',
        headerLeft: ()=> null,
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primaryColor
        },
      }}  />
      <Stack.Screen name="Profile" component={Profile} options={{
        title:'Perfil de usuario',
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primaryColor
        },
      }}  />
      <Stack.Screen name="Home" component={Home} options={{
        title:'ORDENES',
        ...TransitionPresets.SlideFromRightIOS,
        headerLeft: ()=> null,
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primaryColor
        },
      }} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} options={{
        title:'REGISTRO DE AVANCE',
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primaryColor
        },
        headerBackTitle: 'Atrás'
      }} />
      <Stack.Screen name="OrderProgress" component={OrderProgress} options={{
        title:'AVANCE POR MAQUINARIA',
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: Colors.white,
        headerStyle: {
          backgroundColor: Colors.primaryColor
        },
        headerBackTitle: 'Atrás'
      }} />
    </Stack.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator 
      mode="modal" 
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'rgba(0,0,0,0.3)' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
    }}>
      <Stack.Screen
        name="App"
        component={AppStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddTimeControl" component={AddTimeControl} options={{cardStyle: { backgroundColor: Colors.primaryColor }, cardOverlayEnabled: false, ...TransitionPresets.ModalSlideFromBottomIOS,}}/>
      <Stack.Screen name="AddFuelControl" component={AddFuelControl} options={{cardStyle: { backgroundColor: Colors.primaryColor }, cardOverlayEnabled: false, ...TransitionPresets.ModalSlideFromBottomIOS,}}/>
      <Stack.Screen name="AddNonWorkingHours" component={AddNonWorkingHours} options={{cardStyle: { backgroundColor: Colors.primaryColor }, cardOverlayEnabled: false, ...TransitionPresets.ModalSlideFromBottomIOS,}} />
      <Stack.Screen name="AddOrderProgress" component={AddOrderProgress} options={{...TransitionPresets.ModalSlideFromBottomIOS,}} />
      <Stack.Screen name="PickerView" component={PickerView} options={{cardStyle: { backgroundColor: Colors.primaryColor }, cardOverlayEnabled: false, ...TransitionPresets.ModalSlideFromBottomIOS,}} />
      
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}  />
    </Stack.Navigator>
  );
}

const SwitchNavigator = createCompatNavigatorFactory(createStackNavigator)(
  {
    AuthLoading: AuthLoading,
    Root: RootStack,
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