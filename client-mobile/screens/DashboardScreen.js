import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Button, FlatList, Linking, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from "axios";

export default function DashboardScreen({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState('Empty')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axios.get('https://23ca-110-138-83-92.ngrok.io/ordersBarber', {
        headers: {
          access_token: token
        }
      })
      setOrders(response.data)
      setLoading(false)
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios')
    setDate(currentDate)

    let tempDate = new Date(currentDate)
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + '| Minutes: ' + tempDate.getMinutes();
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
            <Text style={styles.textDashboard}>Total Cukur    :</Text>
            <Text style={styles.textDashboard}>Total Income  :</Text>
            <Text style={styles.textDashboard}>Total Upvote   :</Text>
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
            orders.length > 0 && orders.map((item) => {
              return (
              <View key={item.id}>
                <Text>{item.id}</Text>
                <Text>{item.hour}</Text>
                <Text>{item.price}</Text>
                <Text>{item.address}</Text>
                <Button title="Location" onPress={ ()=> Linking.openURL(`https://www.google.com/maps/@{item.lat},{item.long},17zm`) }/>
                
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
