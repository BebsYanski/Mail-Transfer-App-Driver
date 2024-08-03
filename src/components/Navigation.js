//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen'
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

// create a component
const Navigation = () => {

  const {userInfo, splashLoading} = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen name="Splash Screen" component={SplashScreen} options={{headerShown: false}} />
        ) : 
          userInfo.authToken ? (
          <Stack.Screen name='Home' component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: true}} />
          </>
         )}
        
      </Stack.Navigator>
    </NavigationContainer>
  )
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Navigation;
