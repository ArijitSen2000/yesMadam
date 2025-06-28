import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={() => dispatch(login({ email, password }))} />
      <Button title="Go to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: scale(20),
  },
  title: {
    fontSize: moderateScale(24),
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: scale(10),
    marginBottom: verticalScale(10),
    borderRadius: scale(5),
    fontSize: moderateScale(14),
  },
  buttonSpacing: {
    marginBottom: verticalScale(10),
  },
});

  export default LoginScreen;
  