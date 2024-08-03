//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from './src/components/GeoLocation';
import DriverLocationTracker from './src/components/DriverLocationTracker';
import Navigation from './src/components/Navigation'
import { AuthContext } from './src/context/AuthContext'
import { AuthProvider } from './src/context/AuthContext'


// create a component 
const App = () => {
  // const { userInfo, logout, isLoading } = useContext(AuthContext)

  return (
    <AuthProvider style={styles.container}>
      <Text>App</Text>
      {/* <Geolocation /> */}
      {/* <DriverLocationTracker driverId={userInfo.driverId} /> */}
      <Navigation />
    </AuthProvider>
  )
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
