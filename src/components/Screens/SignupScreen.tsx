import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/authSlice";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
      marginTop: verticalScale(10),
    },
  });
  