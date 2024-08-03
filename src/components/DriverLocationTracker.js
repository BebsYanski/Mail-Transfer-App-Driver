import React, { useEffect } from 'react'
import { Alert, View } from 'react-native'
import * as Location from 'expo-location'

const updateDriverLocationToBackend = async (driverId, latitude, longitude) => {
  try {
    const response = await fetch(
      `http://192.168.153.56:8080/driver/${driverId}/location`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latitude, longitude }),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update location')
    }
  } catch (error) {
    console.error(error)
  }
}

const requestLocationPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied')
    return false
  }

  let backgroundStatus = await Location.requestBackgroundPermissionsAsync()
  if (backgroundStatus.status !== 'granted') {
    Alert.alert('Permission to access background location was denied')
    return false
  }

  return true
}

const startLocationUpdates = async (driverId) => {
  const hasPermission = await requestLocationPermission()
  if (!hasPermission) return

  await Location.startLocationUpdatesAsync('background-location-task', {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000,
    distanceInterval: 50,
    foregroundService: {
      notificationTitle: 'Location Tracking',
      notificationBody: 'We are tracking your location',
    },
  })

  Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
      distanceInterval: 10,
    },
    (location) => {
      console.log(location)
      updateDriverLocationToBackend(
        driverId,
        location.coords.latitude,
        location.coords.longitude
      )
    }
  )
}

const DriverLocationTracker = ({ driverId }) => {
  useEffect(() => {
    startLocationUpdates(driverId)
  }, [driverId])

  return <View />
}

export default DriverLocationTracker
;
