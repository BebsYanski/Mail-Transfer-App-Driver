//import liraries
import React, { Component, useContext } from 'react';
import {Button, View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../context/AuthContext';
import DriverLocationTracker from '../components/DriverLocationTracker';
import DriverMails from '../components/DriverMails';

// create a component
const HomeScreen = () => {
  const {userInfo, logout, isLoading} = useContext(AuthContext)
  console.log(userInfo)
  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.welcome}>Welcome {userInfo.firstName}</Text>
      <Button title='Logout' color='red' onPress={logout} />
      <DriverLocationTracker driverId={userInfo.id} />
      <DriverMails driverId={userInfo.id} />
    </View>
  )
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 10
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  }
});

//make this component available to the app
export default HomeScreen;
