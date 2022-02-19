import React, { useState } from "react";
import {styles} from "../styling/";
import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View, ScrollView, } from "react-native";
import { Button, SocialIcon } from "react-native-elements";


export default function LoginScreen({navigation}) {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
 
  console.log(username,password)
  const onLoginPress = () => {
    setUsername('')
    setPassword('')
    navigation.navigate('Dashboard')
  };

  return (
    <ScrollView>
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Shave8</Text>
            <TextInput placeholder="Username" placeholderColor="#c4c3cb"   onChangeText={username => setUsername(username)} value={username} style={styles.loginFormTextInput} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" onChangeText={password => setPassword(password)} 
            value={password} style={styles.loginFormTextInput} secureTextEntry={true} />
            <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress()} title="Login" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
  );
}
