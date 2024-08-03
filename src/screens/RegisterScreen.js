//import liraries
import React, { Component, useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native'
import { AuthContext } from '../context/AuthContext'
import Spinner from 'react-native-loading-spinner-overlay'

// create a component
const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [agency, setAgency] = useState(null)
  const [password, setPassword] = useState(null)
  // const [vehicleNumber, setVehicleNumber] = useState(null)
  const {isLoading, register } = useContext(AuthContext)

  const registerDriver = async () => {
    /*  const { firstName, lastName, email, phoneNumber, agency, password, vehicleNumber } = yourFormData; // Assuming you have this data populated somewhere */

    try {
      const response = await fetch('http://192.168.65.56:8080/driver', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          agency,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const responseData = await response.json()
      console.log(responseData)
      console.log(
        'POST Response',
        'Response Body ->' + JSON.stringify(responseData)
      )

      // Clear input fields or state variables after successful registration
      setAgency('')
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setPhoneNumber('')
    } catch (error) {
      console.error('Register Error Message ->', error)
      // Handle error state or feedback to the user as needed
    }
  }

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder='Enter first name'
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter last name'
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter phone Number'
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter agency'
          value={agency}
          onChangeText={(text) => setAgency(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Enter password'
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
{/*         <TextInput
          style={styles.input}
          placeholder='Enter vehicle Number'
          value={vehicleNumber}
          onChangeText={(text) => setVehicleNumber(text)}
        /> */}
        <Button
          title='Register'
          onPress={() => {
            setAgency('')
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
      setPhoneNumber('')
            register(
              firstName,
              lastName,
              email,
              phoneNumber,
              agency,
              password
            )
          }}
        />

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    width: '80%',
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
})

//make this component available to the app
export default RegisterScreen
