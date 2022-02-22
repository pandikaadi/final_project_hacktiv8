import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Picker,
  TouchableOpacity,
} from "react-native";

export default function DetailUserScreen({ route }) {
  const { orderId } = route.params;
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const baseUrl = `http://e519-123-253-232-109.ngrok.io`;
  const getOrderById = async () => {
    console.log(`${baseUrl}/orders/${orderId}`);
    try {
      const value = await AsyncStorage.getItem("token");
      const response = await axios.get(`${baseUrl}/orders/${orderId}`, {
        headers: {
          access_token: value,
        },
      });
      setOrder(response.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  const changeStatus = async (params) => {
    try {
      console.log(params);
      console.log(`${baseUrl}/ordersBarber/${orderId}`);
      const value = await AsyncStorage.getItem("token");
      const response = await axios.patch(
        `${baseUrl}/ordersBarber/${orderId}`,
        {
          statusBarber: params,
        },
        {
          headers: {
            access_token: value,
          },
        }
      );
      // console.log(response.data)
      getOrderById();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getOrderById();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>...loading</Text>
      </View>
    );
  }
  console.log(order.order.statusBarber);
  return (
    <View>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={styles.cardUserDetail}>
          <Text>Nama Pelanggan :{order.user.username}</Text>
          <Text>Nomer Telepon: {order.user.phoneNumber}</Text>
          <Text>Jam dan Tanggal</Text>
          <Text>Status Pembayaran</Text>
          <Text>coordinat </Text>
          <Text>Status Cukur</Text>
          <View style={styles.container}>
            {order.order.statusBarber === "Paid" ? (
              <TouchableOpacity onPress={() => changeStatus("OTW")}>
                <Text>On My Way !</Text>
              </TouchableOpacity>
            ) : null}
            {order.order.statusBarber === "OTW" ? (
              <TouchableOpacity onPress={() => changeStatus("Finished")}>
                <Text>Finish</Text>
              </TouchableOpacity>
            ) : null}
            {}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardUserDetail: {
    margin: 10,
    backgroundColor: "#282c34",
    borderRadius: 20,
    height: "95%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#000000",
    shadowRadius: 5,
    shadowOpacity: 4,
  },
});
