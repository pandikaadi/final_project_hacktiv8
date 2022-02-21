
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function DetailUserScreen({ route }) {
  const { orderId } = route.params
  const [order, setOrder] = useState({})
  console.log(route.params)
  console.log(order)
  const baseUrl = `https://4574-110-138-83-92.ngrok.io`
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
    } catch (err) {
      alert(err.message)
    }
  }

  useEffect(() => {
    getOrderById()
  }, [])
  return (
    <View>
      <StatusBar style='auto' />
      <SafeAreaView>
        <View style={styles.cardUserDetail}>
          <Text></Text>
          <Text></Text>
          <Text>Jam dan Tanggal</Text>
          <Text>Status Pembayaran</Text>
          <Text>coordinat </Text>
          <Text>Status Cukur</Text>
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
