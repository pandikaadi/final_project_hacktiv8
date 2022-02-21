import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Linking, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from "axios";
import * as Location from "expo-location";

export default function DashboardScreen({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('Empty')
  const [orders, setOrders] = useState([])
  const [ordersByDate, setOrdersByDate] = useState([])
  const [votes, setVotes] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [statistic, setStatistic] = useState({
    totalIncome: 0,
    totalCukur: 0,
    avgRating: 0
  })
  // console.log(orders);
  useEffect(() => {
    let avg = null
    if(votes.length > 0) {
      votes.forEach((e) => {
        avg += e.value
      })
      console.log(avg, votes.length,`>>>`);
      console.log(statistic);
    }

    if(orders.length > 0) {
    let totalCukur = 0
    let totalIncome = 0
      orders.forEach((e) => {
        if(e.statusBarber === "Finished" || e.statusBarber === "Voted") {
          totalCukur += 1
          totalIncome += e.price
        }
      })
      setStatistic({
        ...statistic,
        totalCukur,
        totalIncome,
        avgRating: 0 || +(avg/votes.length).toFixed(1)
      })
      console.log(totalCukur, totalIncome, `>>>>`);
    }
  }, [orders, votes])
  const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axios.get('http://8038-123-253-232-109.ngrok.io/ordersBarber', {
        headers: {
          access_token: token
        }
      })
      const responseVotes = await axios.get(`http://8038-123-253-232-109.ngrok.io/votes/${response.data[0].barberId}`, {
        headers: {
          access_token: token
        }
      })
      setVotes(responseVotes.data)
      setOrders(response.data)
      setLoading(false)
    } catch (err) {
      alert(err.message)
    }
  }
  
  const [token, setToken] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const tokenlogin = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        setToken(value)
        navigation.navigate("Dashboard")
        // console.log('masukés')
      } else {
        console.log('tidak masuks')
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      (async () => {
        try {
          await tokenlogin()
          // console.log(token, `<<<< ini tokenys`);
          if(token) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
              setErrorMsg("Permission to access location was denied");
              return;
            }
    
            let getLocation = await Location.getCurrentPositionAsync({});
            setLocation({
              lat: getLocation.coords.latitude,
              long: getLocation.coords.longitude,
            });
            const response = await axios({
              url: `http://8038-123-253-232-109.ngrok.io/barbers/location`,
              method: "PATCH",
              headers: { access_token: token },
              data: {
                lat: getLocation.coords.latitude,
                long: getLocation.coords.longitude,
              },
            });
            // console.log(response,`>>> ini reasdssp`);
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }, 90000)
  
    return () => clearInterval(intervalId);
   
  }, [token]);

  useEffect(() => {
    getOrders()
    .then(() => {
      setOrdersByDate(orders)
    })
  }, [])
  console.log(date);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    let splitReverse = fDate.split('-').reverse()
    let fTime = 'Hours: ' + (tempDate.getHours()) + '| Minutes: ' + tempDate.getMinutes();
    console.log(orders[0].date.split('T')[0].split('-').reverse().join('-'), `sadsad`);
    let splitted = fDate.split("-")
    let formatted = [null,null,null]
    if (splitted[0].length === 1) formatted[0] = "0" + splitted[0]
    else formatted[0] = splitted[0]
    if (splitted[1].length === 1) formatted[1] = "0" + splitted[1]
    else formatted[1] = splitted[1]
    formatted[2] = splitted[2]
    let selectedOrders = []
    orders.forEach(e => {
        console.log(e.date.split('T')[0].split('-').reverse().join('-') === formatted.join("-"), "loop");
        if(e.date.split('T')[0].split('-').reverse().join('-') === formatted.join("-")) {
          selectedOrders.push(e)
        }
    })

    setOrdersByDate(selectedOrders)
    
    setText(fDate)
    
    // console.log(fDate + '(' + fTime + ') ')
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    navigation.navigate('Login')
  }

  if (loading) {
    return(
      <View>
        <Text>...loading</Text>
      </View>
    )
  }


  return (
    
    <View>
      <StatusBar style='auto' />
      <SafeAreaView>
        <View style={[styles.cardDashboard, styles.flexDirDashboard]}>
          <View>
            <Text >Gambar</Text>
          </View>
          <View>
            <Text style={styles.textDashboard}>Total Cuts    : {statistic.totalCukur}</Text>
            <Text style={styles.textDashboard}>Total Income  : Rp. {statistic.totalIncome}</Text>
            <Text style={styles.textDashboard}>Average Rating   : {statistic.avgRating}</Text>
          </View>
        </View>
        <View style={styles.cardDashboard}>
          <Text>{text}</Text>
          <View >
            <Button title='DatePicker' onPress={() => showMode('date')} />
          </View>
          <View>
          </View>
          {show && (<DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />)}
        </View>
        <View style={styles.cardDashboard}>
          <Text>Table untuk list order</Text>
          {
            ordersByDate.length > 0 && ordersByDate.map((item) => {
              return (
              <View key={item.id}>
                <Text>{item.id}</Text>
                <Text>{item.hour}</Text>
                <Text>{item.price}</Text>
                <Text>{item.address}</Text>
                <Button title="Location" onPress={ ()=> Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.lat}%2C${item.long}`) }/>
                
              </View>
              )
            })
          }
        </View>
        <Button onPress={logout} title="Log Out" />
      </SafeAreaView>
    </View>
  )
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
  },
  cardDashboard: {
    margin: 10,
    backgroundColor: '#282c34',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 4,
  },
  textDashboard: {
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 20
  },
  cardUserDetail: {
    margin: 10,
    backgroundColor: '#282c34',
    borderRadius: 20,
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    shadowColor: '#000000',
    shadowRadius: 5,
    shadowOpacity: 4,
  },
  flexDirDashboard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
});
