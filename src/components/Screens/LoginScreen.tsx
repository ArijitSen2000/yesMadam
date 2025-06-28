import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

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
      padding: 20
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5
    }
  });

  export default LoginScreen;
  