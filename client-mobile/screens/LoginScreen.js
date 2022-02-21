import React, { useState, useEffect } from "react";
import { Alert, Image, Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, Pressable, View, ScrollView, Button, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  console.log(email, password)
  const baseUrl = `https://4574-110-138-83-92.ngrok.io`
  const onLoginPress = async () => {
    try {
      const response = await axios.post(`${baseUrl}/barbers/login`, {
        email,
        password
      })
      // console.log(response.data)
      await AsyncStorage.setItem('token', response.data.access_token)
      setEmail('')
      setPassword('')
      navigation.navigate('Dashboard')
    } catch (error) {
      alert('Email or Password is invalid')
      console.log(error)
    }
  }

  const tokenlogin = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        setToken(value)
        navigation.navigate("Dashboard")
        console.log('masuké')
      } else {
        console.log('tidak masuk')
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(async() => {
    await tokenlogin()
  }, [])

  

  

  return (
    <ScrollView >
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

          <View style={styles.loginScreenContainer}>
            <StatusBar style='auto' />
            <View style={styles.loginFormView}>
              <Text style={styles.logoText} >Shave8</Text>
              <TextInput style={styles.loginFormTextInput} placeholder="Email" placeholderColor="#c4c3cb" onChangeText={email => setEmail(email)} value={email} />
              <TextInput style={styles.loginFormTextInput} placeholder="Password" placeholderColor="#c4c3cb" onChangeText={password => setPassword(password)}
                value={password} secureTextEntry={true} />
              <Button buttonStyle={styles.loginButton} onPress={onLoginPress} title="Login" />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerView: {
    flex: 1,
    alignItems: "center"
  },
  loginScreenContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },
  loginFormView: {
    flex: 1,
  },
  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    width: 350,
    alignItems: "center"
  }
});
