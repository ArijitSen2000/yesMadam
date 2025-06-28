import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    email: '',
    password: '',
    registeredUsers: {}, // { email: password }
  },
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const userPassword = state.registeredUsers[email];
      if (userPassword && userPassword === password) {
        state.isLoggedIn = true;
        state.email = email;
        state.password = password;
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or user not found.');
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = '';
      state.password = '';
    },
    signup: (state, action) => {
      const { email, password } = action.payload;
      if (state.registeredUsers[email]) {
        Alert.alert('Signup Failed', 'User already exists.');
      } else {
        state.registeredUsers[email] = password;
        Alert.alert('Signup Success', 'Account created successfully. Please login.');
      }
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
  export default authSlice;