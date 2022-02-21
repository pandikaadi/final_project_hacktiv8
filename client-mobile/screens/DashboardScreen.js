import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Linking, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from "axios";
import * as Location from "expo-location";

const baseUrl = `https://6c28-123-253-232-109.ngrok.io`

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
  const [token, setToken] = useState(null)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
    }
  }, [orders, votes])
  const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      setToken(token)
      const response = await axios.get(`${baseUrl}/ordersBarber`, {
        headers: {
          access_token: token
        }
      })
      const responseVotes = await axios.get(`${baseUrl}/votes/${response.data[0].barberId}`, {
        headers: {
          access_token: token
        }
      })
      console.log(responseVotes.data,'dari axios')
      setVotes(responseVotes.data)
      setOrders(response.data)
      setLoading(false)
    } catch (err) {
      alert(err.message)
    }
  }
  const tokenlogin = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      if (value !== null) {
        setToken(value)
        navigation.navigate("Dashboard")
        // console.log('masukÃ©s')
      } else {
        console.log('tidak masuks')
      }

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(async () => {
    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
      (async () => {
        try {
          await tokenlogin()
          // console.log(token, `<<<< ini tokenys`);

          if (token) {


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
              url: `${baseUrl}/barbers/location`,
              method: "PATCH",
              headers: { access_token: token },
              data: {
                lat: getLocation.coords.latitude,
                long: getLocation.coords.longitude,
              },
            });
          }
        } catch (error) {
          console.log(`kalo error`);
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

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
    

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    let splitReverse = fDate.split('-').reverse()
    let fTime = 'Hours: ' + (tempDate.getHours()) + '| Minutes: ' + tempDate.getMinutes();
    let splitted = fDate.split("-")
    let formatted = [null,null,null]
    if (splitted[0].length === 1) formatted[0] = "0" + splitted[0]
    else formatted[0] = splitted[0]
    if (splitted[1].length === 1) formatted[1] = "0" + splitted[1]
    else formatted[1] = splitted[1]
    formatted[2] = splitted[2]
    let selectedOrders = []
    orders.forEach(e => {
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
    return (
      <View>
        <Text>...loading</Text>
      </View>
    )
  }


  return (
    <ScrollView>
      <View>
        <StatusBar style='auto' />
        <SafeAreaView>
          <View style={[styles.cardDashboard, styles.flexDirDashboard]}>

            <View style={{flex:2}}>
              <Text >Gambar</Text>
            </View>
            <View style={{flex: 3}}>
            <View style={{flexDirection: "row", width:"100%"}} >
              <View style={[{flex:1}]}>
                <Text style={[styles.textDashboard]}>Total Cuts        :</Text>

              </View>
              <View style={[{flex: 1}]}>
                <Text style={[styles.textDashboard]}>{statistic.totalCukur}</Text>

              </View>
              
                    
            </View>
            <View style={{flexDirection: "row", width:"100%"}} >
              <View style={[{flex: 1}]}>
                <Text style={[styles.textDashboard]}>Total Income   :</Text>

              </View>
              <View style={[{flex: 1}]}>
                <Text style={[styles.textDashboard]}>Rp.{statistic.totalIncome}</Text>

              </View>
              
                    
            </View>
            <View style={{flexDirection: "row", width:"100%"}} >
              <View style={[{flex: 1}]}>
                <Text style={[styles.textDashboard]}>Rating              :</Text>

              </View>
              <View style={[{flex: 1}]}>
                <Text style={[styles.textDashboard]}>Rp.{statistic.avgRating}</Text>

              </View>
              
                    
            </View>

            {/* <View style={{flexDirection: "row"}} >
              <Text style={[styles.textDashboard, {flex: 1}]}>Total Cuts    :</Text>
              <Text style={[styles.textDashboard, {flex: 1}]}>{statistic.totalCukur}</Text>
                    
                    </View> */}
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
          <View>
            <Text>Table untuk list order</Text>
            {
              ordersByDate.length > 0 && ordersByDate.map((item) => {
                return (

                  <View style={styles.cardDashboard} key={item.id}>
                    <Text style={{ color: "white" }}>{item.id}</Text>
                    <Text style={{ color: "white" }}>{item.hour}</Text>
                    <Text style={{ color: "white" }}>{item.price}</Text>
                    <Text style={{ color: "white" }}>{item.address}</Text>
                    <Button title="Location" onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.lat}%2C${item.long}`)} />
                    <Button title="Detail" onPress={() => toDetail(item.id)} />
                  </View>
                )
              })
            }
          </View>
          <Button onPress={logout} title="Log Out" />
        </SafeAreaView>
      </View>
    </ScrollView>
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