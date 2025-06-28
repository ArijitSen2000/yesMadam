import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useSelector, useDispatch } from 'react-redux';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';


const Stack = createNativeStackNavigator();

const NavigationStack = () => {
    const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    {isLoggedIn ? (
      <Stack.Screen name="Home" component={HomeScreen} />
    ) : (
      <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </>
    )}
  </Stack.Navigator>
  )
}

export default NavigationStack;

const styles = StyleSheet.create({})