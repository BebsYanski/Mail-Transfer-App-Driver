//import liraries
import React, { Component, useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Button, Linking, Platform } from 'react-native'
import * as Location from 'expo-location'
import {IntentLauncherAndroid} from 'expo'
import Modal from "react-native-modal"
import axios from 'axios'


const LOCATION_TASK_NAME = 'background_location_task';
// create a component
const Geolocation = () => {
  const [location, setLocation] = useState(null)
  const [reverseCodededLocation, setReverseCodededLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState(null);
  const [address, setAddress] = useState()
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false) 
  const [openSettings, setOpenSetting] = useState(false)
  const [state, setState] = useState('Waiting...')


  useEffect(() => {
    
       (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
        

}, []);

   

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address)
    console.log('Geocoded Address')
    console.log(geocodedLocation)
  }

  const reverseGeocode = async () => {
    const reverseGeocodedLocation = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    })
    console.log('Reverse Geocoded Address', reverseGeocodedLocation)
    setReverseCodededLocation(reverseGeocodedLocation)
    console.log(location.coords.latitude)
  }

  const openSetting = () => {
    if(Platform.OS == 'ios' ){
      Linking.openURL('app-setting:');
    } else {
      IntentLauncherAndroid.startActivityAsync(IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS);
    };
    setOpenSetting(false);
  }

  

   const sendLocationToServer = async (location) => {
    try {
      await axios.post('http://192.168.117.56:8080/locations', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        timestamp: location.timestamp,
      });
    } catch (error) {
      console.error('Error sending location to server:', error);
    }
  };


      const startTracking = async () => {
    setTracking(true);
    reverseGeocode()
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.High,
      timeInterval: 5000, // Get location update every 5 seconds
      distanceInterval: 5, // Get location update every 5 meters
      foregroundService: {
        notificationTitle: 'Using your location',
        notificationBody: 'To turn off, go back to the app and switch something off.',
      },
    });
    await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 5,
      },
      (newLocation) => {
        setLocation(newLocation);
        sendLocationToServer(newLocation);
      }
    );
  };

  const stopTracking = async () => {
    setTracking(false);
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location.coords);
    text = JSON.stringify(reverseCodededLocation);
  }

  return (
    <View style={styles.container}> 
      {/* <StatusBar style='auto' /> */}
      <Text>{text}</Text>
       <Button
        title={tracking ? "Stop Tracking" : "Start Tracking"}
        onPress={tracking ? stopTracking : startTracking}
      />
      <TextInput
        style={styles.input}
        placeholder='Write Address'
        value={address}
        onChangeText={setAddress}
      />
      <Button title='Reverse Geocode Address' onPress={reverseGeocode} />
    </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: '#2c3e50',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
})

//make this component available to the app
export default Geolocation
