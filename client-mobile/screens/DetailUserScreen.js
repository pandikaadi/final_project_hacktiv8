
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View,Picker,TouchableOpacity, Linking } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function DetailUserScreen( { route, navigation } ) {
  const { orderId } = route.params
  const [order, setOrder] = useState({})
 
  const [loading, setLoading] = useState(true)
  const baseUrl = `http://a37f-123-253-232-109.ngrok.io`
  const getOrderById = async () => {
    console.log(`${baseUrl}/orders/${orderId}`)
    try {
      const value = await AsyncStorage.getItem('token')
      const response = await axios.get(`${baseUrl}/orders/${orderId}`, {
        headers: {
          access_token: value
        }
      })
      setOrder(response.data)
      setLoading(false)
    } catch (err) {
      alert(err)
    }
  }

  const changeStatus = async (params) => {
    try {
      // console.log(params)
      console.log(`${baseUrl}/ordersBarber/${orderId}`)
      const value = await AsyncStorage.getItem('token')
      const response = await axios.patch(`${baseUrl}/ordersBarber/${orderId}`, {
        statusBarber: params
      }, {
        headers: {
          access_token: value
        }
      })
      // console.log(response.data)
      getOrderById()
    } catch (err) {
      alert(err)
    }
  }



  useEffect(() => {
    getOrderById()
  }, [])

  if (loading) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    )
  }
  console.log(order.order.statusBarber)
  console.log(order.order)
  return (
    <View>
      <StatusBar style='auto' />
      <SafeAreaView>
              <View
               style={{
                backgroundColor:"#F7F6F2",
                paddingTop: 10,
                borderBottomWidth: 2,
                borderColor: "#9A9483"
               }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={
                    {
                      width: 50,
                      flexDirection: "row",
                      marginBottom: 10,
                    }
                  }
                >
                  <Ionicons
                    name="arrow-back-circle-outline"
                    size={30}
                    color="black"
                    style={{
                      marginRight: 10,
                      marginLeft: 10,
                      
                    }}
                  />
                  <Text
                    style={
                    { color: "black",
                            fontWeight: "bold",
                            textAlign: "center",
                            textAlignVertical:"center"
                          }
                    }
                  >
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
        <View style={styles.cardUserDetail}>
          <Text style={{color: "white"}}>Nama Pelanggan :{order.user.username}</Text>
          <Text style={{color: "white"}}>Nomer Telepon: {order.user.phoneNumber}</Text>
          <Text style={{color: "white"}}>Jam dan Tanggal</Text>
          <Text style={{color: "white"}}>Status Pembayaran</Text>
          <Text style={{color: "white"}}>coordinat </Text>
          <Text style={{color: "white"}}>Status Cukur</Text>
          <View style={styles.container}>
            {
              order.order.statusBarber === 'Paid' ? <TouchableOpacity onPress={() => changeStatus('OTW')}><Text>On My Way !</Text></TouchableOpacity> : null
            }
            {
              order.order.statusBarber === 'OTW' ? <TouchableOpacity onPress={() => changeStatus('Finished')}><Text>Finish</Text></TouchableOpacity> : null
            }
            <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${order.order.lat}%2C${order.order.long}`)}>
          <Text style={{color: "#282c34", backgroundColor:"white", width:150, marginTop: 5, fontWeight:"bold", borderRadius:10, paddingHorizontal: 30, borderWidth: 2, borderColor:"black", textAlignVertical:"center",textAlign:"center", padding: 5}}>NAVIGATE</Text>
        </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
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
});
