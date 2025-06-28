import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/authSlice";

const SignupScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button
        title="Signup"
        onPress={() => {
          dispatch(signup({ email, password }));
          navigation.navigate("Login");
        }}
      />
    </View>
  );
};
  
  export default SignupScreen;
  
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
  cl