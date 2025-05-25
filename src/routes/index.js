import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/app';
import { LoginScreen, SignUpScreen } from '../screens/auth';
import { BottomTab } from '../navigation'; // BottomTab should be included in the app flow after login
import ScreenNames from './routes';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/slices/user';
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName={ScreenNames.LOGIN} screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={ScreenNames.SIGNUP}
      component={SignUpScreen}
    />
    <Stack.Screen
      name={ScreenNames.LOGIN}
      component={LoginScreen}
    />
    <Stack.Screen
      name={ScreenNames.BOTTOMTAB}
      component={BottomTab}
    />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator initialRouteName={ScreenNames.BOTTOMTAB} screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name={ScreenNames.HOME}
      component={HomeScreen}
    />
    <Stack.Screen
      name={ScreenNames.BOTTOMTAB}
      component={BottomTab}
    />
  </Stack.Navigator>
);

const Routes = () => {
  
  // const isLoggedIn = useSelector(selectIsLoggedIn); 
  const isLoggedIn = false

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default Routes;

const styles = StyleSheet.create({});
