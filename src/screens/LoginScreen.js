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
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={styles.container}> 
    <Spinner visible={isLoading}/>
      <View style={styles.wrapper}>
        <TextInput
          style={styles.input}
          placeholder='Enter email'
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter password'
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button title='Login' onPress={()=>{
          login(email, password)
        }} />

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Don't have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} >
            <Text style={styles.link}>Register</Text>
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
export default LoginScreen
