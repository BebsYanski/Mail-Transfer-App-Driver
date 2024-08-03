//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

// create a component
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color= '#ffffff' />
      <Text>SplashScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06bcee',
  },
});

//make this component available to the app
export default SplashScreen;
