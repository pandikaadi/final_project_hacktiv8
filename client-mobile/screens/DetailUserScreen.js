import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  Linking,
  View,
  Picker,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function DetailUserScreen({ route, navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const { orderId } = route.params;
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const baseUrl = `https://8f1e-110-138-83-92.ngrok.io`;
  const windowHeight = Dimensions.get("window").height;
  const getOrderById = async () => {
    
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
  // console.log(order.order.address, ">>>>");
  if (loading && !order.order) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          height: windowHeight,
          width: windowWidth,
          backgroundColor: "white",
        }}
      >
        <View style={{marginHorizontal:"auto", paddingHorizontal:"auto", alignItems:"center"}}>
          <Image
            source={require("../assets/loading.gif")}
            style={[{ width:150, height: 100, resizeMode:"contain", marginHorizontal:"auto" }]}
          />
        </View>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "#282c34", height: windowHeight }}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View
          style={{
            backgroundColor: "#282c34",
            paddingTop: 10,
            borderColor: "#F7F6F2",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 50,
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={32}
              color="#ddd9d6"
              style={{
                marginRight: 10,
                marginLeft: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent:"center", marginTop:"auto", marginBottom:"auto", paddingBottom:20}}>
          <View style={[styles.cardUserDetail, {paddingHorizontal: 20}]}>
            <View
              style={{
                marginBottom: 5,
                marginTop: 20
              }}
            >
              <Text
                style={{ color: "#282c34", fontSize: 25, fontWeight: "bold", borderBottomWidth:2, paddingBottom:5, borderColor:"#4682B4", textAlign:"center" }}
              >
                {order.order.Service.name.toUpperCase()}
              </Text>
            </View>
            <View style={{flexDirection:"row", paddingTop:10, justifyContent:"space-between"}}>
              <Text style={{ color: "#6E7C7C", fontWeight:"bold", fontSize:17, marginBottom:5, textAlignVertical:"center" }}>
                Client Detail
              </Text>
              {/* <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5, textAlignVertical:"center" }}>
                {order.order.orderKey}
              </Text> */}
            </View>
            <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>
              {order.user.username}
            </Text>
            <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>
              {order.user.phoneNumber}
            </Text>
            {/* <Image style={[{width: "100%", height: "100%"}]} source={{uri: }} /> */}
            <View style={{borderBottomWidth:2, paddingBottom:5, borderColor:"#4682B4", marginBottom: 5}}>
              <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>{order.order.hour}</Text>
              <Text style={{ color: "#282c34", fontSize:15 }}>{order.order.address} </Text>
            </View>
            <View style={{borderBottomWidth:2, paddingTop:10, paddingBottom:5, borderColor:"#4682B4"}}>
            <Text style={{ color: "#6E7C7C", fontWeight:"bold", fontSize:17, marginBottom:5, textAlignVertical:"center" }}>
                Payment Detail
              </Text>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>Service Price</Text>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>Rp. {order.order.Service.price}</Text>

              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>Travel Fee</Text>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>Rp. {order.order.price - order.order.Service.price}</Text>

              </View>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>Total Payment</Text>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 5 }}>Rp. {order.order.price}</Text>

              </View>
            </View>
            <View style={{paddingBottom:5, paddingTop:10, borderColor:"#4682B4"}}>
              <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 1 }}>Status Order</Text>
                <Text style={{ color: "#282c34", fontSize:15, marginBottom: 1 }}>{order.order.statusBarber}</Text>

              </View>
            </View>
            <View style={[styles.container, {marginTop:"auto"}]}>
              { order.order.statusBarber === "Paid" || order.order.statusBarber === "OTW" ?
                <TouchableOpacity onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${order.order.lat}%2C${order.order.long}`)}>
                <Text style={{backgroundColor:"#282c34", marginBottom: 15, fontWeight:"bold", color:"#ddd9d6", borderRadius:20, textAlign:"center", textAlignVertical:"center", paddingVertical:10}}>NAVIGATE</Text>
                </TouchableOpacity> : null
              }
              {order.order.statusBarber === "Paid" ? (
                <TouchableOpacity style={{}} onPress={() => changeStatus("OTW")} >
                  <Text style={{backgroundColor:"#282c34",fontWeight:"bold", marginBottom: 15, color:"#ddd9d6", borderRadius:20, textAlign:"center", textAlignVertical:"center", paddingVertical:10}}>ON MY WAY !</Text>
                </TouchableOpacity>
              ) : null}
              {order.order.statusBarber === "OTW" ? (
                <TouchableOpacity onPress={() => changeStatus("Finished")}>
                <Text style={{backgroundColor:"#282c34", color:"#ddd9d6", fontWeight:"bold", marginBottom: 15 , borderRadius:20, textAlign:"center", textAlignVertical:"center", paddingVertical:10}}>FINISH ORDER</Text>
              </TouchableOpacity>
              ) : null}
              {}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardUserDetail: {
    backgroundColor: "white",
    borderRadius: 30,
    height: "86%",
    marginHorizontal: 20,
    marginTop: 30,
    alignContent: "center",
    shadowColor: "#000000",
    shadowRadius: 5,
    shadowOpacity: 4,
  },
});
