import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import { BASE_URL } from '../config'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [splashLoading, setSplashLoading] = useState(false)

  const register = (
    firstName,
    lastName,
    email,
    phoneNumber,
    agency,
    password,
  ) => {
    setIsLoading(true)

    axios
      .post(`${BASE_URL}/driver/register`, {
        firstName,
        lastName,
        email,
        phoneNumber,
        agency,
        password,
      })
      .then((response) => {
        let userInfo = response.data
        setUserInfo(userInfo)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        setIsLoading(false)
        console.log(userInfo)
      })
      .catch((e) => {
        console.error(`register error ${e}`)
        setIsLoading(false)
        throw new Error(e.response?.data?.message || 'Registration Failed')
      })
  }

  const login = (email, password) => {
    setIsLoading(true)

    axios
      .post(`${BASE_URL}/driver/login`, {
        email,
        password,
      })
      .then((response) => {
        let userInfo = response.data
        console.log(userInfo)
        setUserInfo(userInfo)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        setIsLoading(false)
      })
      .catch((e) => {
        console.error(`login error ${e}`)
        setIsLoading(false)
        throw new Error(e.response?.data?.message || 'Login Failed')
      })
  }

  const logout = () => {
    setIsLoading(true)

    axios
      .post(`${BASE_URL}/driver/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.authToken}`}
        },
      )
      .then((response) => {
        console.log(response.data)
        AsyncStorage.removeItem('userInfo')
        setUserInfo({})
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(`logout error ${error}`)
        setIsLoading(false)
        throw new Error(error.response?.data?.message || 'Logout failed')
      })
  }

  const checkAuth = () => {
    setIsLoading(true)
    axios
      .post(`${BASE_URL}/driver/check`)
      .then((response) => {
        let userInfo = response.data
        console.log(userInfo)
        setUserInfo(userInfo)
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
        setIsLoading(false)
      })
      .catch((error) => {
        throw new Error(error.response?.data?.message || 'Logout failed')
      })
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true)

      let userInfo = await AsyncStorage.getItem('userInfo')
      userInfo = JSON.parse(userInfo)

      if (userInfo) {
        setUserInfo(userInfo)
      }

      setSplashLoading(false)
    } catch (e) {
      setSplashLoading(false)
      console.error(`is logged in error ${e}`);
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        register,
        login,
        logout,
        checkAuth,
        splashLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
