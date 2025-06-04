import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FilterScreen } from '../screens/app';
import { LoginScreen, SignUpScreen } from '../screens/auth';
import { BottomTabNavigation } from '../navigation';
import ScreenNames from './routes';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/user';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName={ScreenNames.LOGIN} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.SIGNUP} component={SignUpScreen} />
    <Stack.Screen name={ScreenNames.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={ScreenNames.BOTTOMTAB} component={BottomTabNavigation} />
    <Stack.Screen name={ScreenNames.FILTER} component={FilterScreen} />
  </Stack.Navigator>
);

const Routes = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
