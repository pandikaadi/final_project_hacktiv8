import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Pressable,
  View,
  ScrollView,
  Button,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const phoneHeight = Dimensions.get("window").height;
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  console.log(email, password);
  const baseUrl = `https://8f1e-110-138-83-92.ngrok.io`;
  const onLoginPress = async () => {
    try {
      const response = await axios.post(`${baseUrl}/barbers/login`, {
        email,
        password,
      });
      // console.log(response.data)
      await AsyncStorage.setItem("token", response.data.access_token);
      await AsyncStorage.setItem("email", email)
      setEmail("");
      setPassword("");
      navigation.navigate("Dashboard");
    } catch (error) {
      alert("Email or Password is invalid");
      console.log(error);
    }
  };

  const tokenlogin = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setToken(value);
        navigation.navigate("Dashboard");
        console.log("masuké");
      } else {
        console.log("tidak masuk");
      }
    } catch (error) {
      console.log(error, `>>>>>>>`);
    }
  };
  useEffect(async () => {
    await tokenlogin();
  }, []);

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <StatusBar style="auto" />
            <View style={styles.loginFormView}>
              <View style={styles.upperTextHandler}>
                <Image
                  style={[{ width: "100%", height: 80 }, styles.logoText]}
                  source={require("../assets/logo1.png")}
                />
                {/* <Text style={styles.upperText}>SHAVE8</Text> */}
              </View>
              <View style={{marginBottom:10}}>
                <TextInput
                  style={styles.loginFormTextInput}
                  placeholder="Email"
                  placeholderColor="#c4c3cb"
                  onChangeText={(email) => setEmail(email)}
                  value={email}
                />
              </View>
              <View style={{marginBottom:10}}>
                <TextInput
                  style={styles.loginFormTextInput}
                  placeholder="Password"
                  placeholderColor="#c4c3cb"
                  onChangeText={(password) => setPassword(password)}
                  value={password}
                  secureTextEntry={true}
                />
              </View>
              <View>
                <TouchableOpacity onPress={onLoginPress} title="Login">
                  <Text style={styles.loginButton}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.bottomTextHandler, {marginTop: 10}]}>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34",
    minHeight: phoneHeight,
  },
  loginScreenContainer: {
    flex: 1,
    minWidth: "75%",
    height: "100%",
    marginTop: 190
  },
  logoText: {
  },
  upperText: {
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  loginFormTextInput: {
    height: 43,
    width: 320,
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
    backgroundColor: "#4169E1",
    fontWeight: "bold",
    height: 43,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 7,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
  bottomTextHandler: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    color: "#4169E1",
    fontWeight: "bold",
  },
});
