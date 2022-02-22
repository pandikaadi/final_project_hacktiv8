import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, FlatList, TouchableOpacity, Image, Linking, Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, ImageBackground } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from "axios";
import * as Location from "expo-location";
import * as TaskManager from 'expo-task-manager';
import bgImage from '../assets/dashboardThumb.jpg'
const LOCATION_TASK_NAME = 'background-location-task';

const baseUrl = `http://a37f-123-253-232-109.ngrok.io`

const requestPermissions = async () => {
  console.log('hereee');
  try {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    // console.log('here', status, statusForeground);
    if (status === 'granted' && statusForeground === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        // distanceInterval: 1, // minimum change (in meters) betweens updates
        distanceInterval: 0,
        timeInterval: 20000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
          notificationTitle: 'Using your location',
          notificationBody:
            'To turn off, go back to the app and switch something off.',
        },
      });
    }
  } catch (error) {
    console.log(error, '<-=-=-=-=-=');
  }
};



export default function DashboardScreen({ navigation }) {
  // const route = useRoute()


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

  const [isMounted, setIsMounted] = useState(true)
  useEffect(() => {
    let avg = null
    if (votes.length > 0) {
      votes.forEach((e) => {
        avg += e.value
      })
    }

    if (orders.length > 0) {
      let totalCukur = 0
      let totalIncome = 0
      orders.forEach((e) => {
        if (e.statusBarber === "Finished" || e.statusBarber === "Voted") {
          totalCukur += 1
          totalIncome += e.price
        }
      })
      setStatistic({
        ...statistic,
        totalCukur,
        totalIncome,
        avgRating: 0 || +(avg / votes.length).toFixed(1)
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
      console.log(error, `>>>>>>`);
    }
  }
  useEffect(async () => {
    requestPermissions()
  }, [token]);

  function priceFormatter(price) {
    let formattedPrice = price.toString().split("");

    for (
      let i = (formattedPrice.length % 3) - 1;
      i < formattedPrice.length;
      i += 3
    ) {
      if (i !== formattedPrice.length - 1) formattedPrice[i] += `.`;
    }

    return `Rp. ${formattedPrice.join("")}`;
  }
  // console.log(ordersByDate[0].Barber.name);

  useEffect(() => {
    console.log(`useEffect mounted`);
    setIsMounted(true)
    getOrders()
      .then(() => {
        setOrdersByDate(orders)
      })
  }, [])
  const list = ({ item }) => {
    return (
      <View style={[styles.cardDashboard, { Width: 340 }]} key={item.id}>
        <View style={{ flexDirection: "row", paddingHorizontal: 20, marginBottom: 5 }}>
          <Text style={{ color: '#ddd9d6', flex: 1, fontWeight: "bold" }}>Schedule        : </Text>
          <Text style={{ color: '#ddd9d6', flex: 1, fontWeight: "bold", textAlign: "center" }}>{item.hour}</Text>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 20, marginBottom: 5 }}>
          <Text style={{ color: '#ddd9d6', flex: 1, fontWeight: "bold", textAlign: "justify" }}>Price               : </Text>
          <Text style={{ color: '#ddd9d6', flex: 1, fontWeight: "bold", textAlign: "center" }}>{priceFormatter(item.price)}</Text>
        </View>
        <View style={{ flexDirection: "row", paddingHorizontal: 20, marginBottom: 5 }}>
          <Text style={{ color: '#ddd9d6', flex: 1, fontWeight: "bold" }}>Service           : </Text>
          <View style={{ flex: 1, textAlign: "center" }}>
            <Text style={{ color: '#ddd9d6', fontWeight: "bold" }}>{item.Service.name}</Text>
          </View>
        </View>
        {/* <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.lat}%2C${item.long}`)}>
          <Text style={{color: "#282c34", backgroundColor:'#ddd9d6', width:150, marginTop: 5, fontWeight:"bold", borderRadius:10, paddingHorizontal: 30, borderWidth: 2, borderColor:"black", textAlignVertical:"center",textAlign:"center", padding: 5}}>NAVIGATE</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => toDetail(item.id)}>
          <Text style={{ color: "#282c34", backgroundColor: '#ddd9d6', width: 180, height: 50, marginTop: 20, fontWeight: "bold", borderRadius: 10, paddingHorizontal: 30, borderWidth: 2, borderColor: '#ddd9d6', textAlignVertical: "center", textAlign: "center", padding: 5 }}>DETAIL</Text>
        </TouchableOpacity>
        {/* <Button title="Location" onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.lat}%2C${item.long}`)} /> */}
        {/* <Button title="Detail" onPress={() => toDetail(item.id)} /> */}

        {/* <Text style={{ color: '#ddd9d6' }}>{item.address}</Text> */}
      </View>
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios')
    setDate(currentDate)


    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getFullYear();
    let splitReverse = fDate.split('-').reverse()
    let fTime = 'Hours: ' + (tempDate.getHours()) + '| Minutes: ' + tempDate.getMinutes();
    let splitted = fDate.split("-")
    let formatted = [null, null, null]
    if (splitted[0].length === 1) formatted[0] = "0" + splitted[0]
    else formatted[0] = splitted[0]
    if (splitted[1].length === 1) formatted[1] = "0" + splitted[1]
    else formatted[1] = splitted[1]
    formatted[2] = splitted[2]
    let selectedOrders = []
    orders.forEach(e => {
      if (e.date.split('T')[0].split('-').reverse().join('-') === formatted.join("-")) {
        selectedOrders.push(e)
      }
    })
    selectedOrders.sort((a, b) => {
      if (a.hour < b.hour) {
        return -1
      }
      if (a.hour > b.hour) {
        return 1
      }
      return 0
    })

    setOrdersByDate(selectedOrders)

    setText(fDate)
  }
  const windowHeight = Dimensions.get('window').height;
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('token')
    setIsMounted(false)
    navigation.navigate('Login')
  }
  const toDetail = (id) => {
    setIsMounted(false)
    navigation.navigate('Detail', { orderId: id })
  }

  if (loading) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    )
  }




  return (
    <>
      <View style={{ minHeight: windowHeight }}>
        <StatusBar style='auto' />
        <SafeAreaView>
          <ImageBackground source={bgImage} resizeMode="cover" style={[{ width: 400, height: 800 }]} blurRadius={5}>
            <View >
              <Image style={[{ width: 400, height: 150, opacity: 0.8 }]} source={require('../assets/dashboardThumb.jpg')} />
            </View>
            <View style={[styles.flexDirDashboard, { marginTop: 0, paddingTop: 0 }]}>
              <View style={{ flex: 3, paddingLeft: 20 }}>
                <View style={{ flexDirection: "row", width: "100%" }} >
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>Hello, {ordersByDate[0].Barber.name}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", width: "100%" }} >
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>Total Cuts        :</Text>
                  </View>
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>{statistic.totalCukur}</Text>
                  </View>


                </View>
                <View style={{ flexDirection: "row", width: "100%" }} >
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>Total Income   :</Text>

                  </View>
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>{priceFormatter(statistic.totalIncome)}</Text>

                  </View>


                </View>

                <View style={{ flexDirection: "row", width: "100%" }} >
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>Rating              :</Text>

                  </View>
                  <View style={[{ flex: 1 }]}>
                    <Text style={[styles.textDashboard]}>{statistic.avgRating}</Text>

                  </View>


                </View>

                {/* <View style={{flexDirection: "row"}} >
              <Text style={[styles.textDashboard, {flex: 1}]}>Total Cuts    :</Text>
              <Text style={[styles.textDashboard, {flex: 1}]}>{statistic.totalCukur}</Text>
                    </View> */}
              </View>
            </View>
            <View>
              <Text>Check Your Bookings :
                <TouchableOpacity onPress={() => showMode('date')}><Text style={styles.loginButton}>Calendar</Text></TouchableOpacity></Text>
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
            <View style={{ marginBottom: 20 }}>
              <FlatList
                data={ordersByDate}
                renderItem={list}
                horizontal
                keyExtractor={(e) => e.id}

              />
            </View>
            <Button buttonStyle={{ color: '#ddd9d6' }} onPress={logout} title="Log Out" />
          </ImageBackground>
        </SafeAreaView>
      </View>
    </>
  )
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  try {
    if (error) {
      console.log(error);
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;
      const token = await AsyncStorage.getItem('token')
      if (token !== null) {
        // console.log('masukÃ©s')
        console.log(locations[0].coords.latitude, locations[0].coords.longitude);
        const response = await axios({
          url: `${baseUrl}/barbers/location`,
          method: "PATCH",
          headers: { access_token: token },
          data: {
            lat: locations[0].coords.latitude,
            long: locations[0].coords.longitude,
          },
        });
      } else {
        console.log('tidak masuks')
      }
      // console.log(locations, new Date(), value, '<---- cara kirim ini ke komponen?');

    }
  } catch (error) {
    console.log(error);
    // ngirim ke server data locations
    // do something with the locations captured in the background
  }
});

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
    backgroundColor: "#ddd9d6",
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
    color: '#ddd9d6',
    marginVertical: 1
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