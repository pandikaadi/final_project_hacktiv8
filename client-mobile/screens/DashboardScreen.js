import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
const LOCATION_TASK_NAME = "background-location-task";

const baseUrl = `https://6a70-110-138-83-92.ngrok.io`;

const requestPermissions = async () => {
  console.log("hereee");
  try {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    const { status: statusForeground } =
      await Location.requestForegroundPermissionsAsync();
    console.log("here", status, statusForeground);
    if (status === "granted" && statusForeground === "granted") {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
        // distanceInterval: 1, // minimum change (in meters) betweens updates
        distanceInterval: 0,
        timeInterval: 20000, // minimum interval (in milliseconds) between updates
        // foregroundService is how you get the task to be updated as often as would be if the app was open
        foregroundService: {
          notificationTitle: "Using your location",
          notificationBody:
            "To turn off, go back to the app and switch something off.",
        },
      });
    }
  } catch (error) {
    console.log(error, "<-=-=-=-=-=");
  }
};

export default function DashboardScreen({ navigation }) {
  // const route = useRoute()

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const [orders, setOrders] = useState([]);
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [votes, setVotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [statistic, setStatistic] = useState({
    totalIncome: 0,
    totalCukur: 0,
    avgRating: 0,
  });

  const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    let totalVote = null;
    if (votes.length > 0) {
      votes.forEach((e) => {
        totalVote += e.value;
      });
    }
    let avg
    if(votes.length === 0) {
      avg = 0
    } else {
      avg = totalVote / votes.length
    }
    
    console.log(votes);
    if (orders.length > 0) {
      let totalCukur = 0;
      let totalIncome = 0;
      orders.forEach((e) => {
        if (e.statusBarber === "Finished" || e.statusBarber === "Voted") {
          totalCukur += 1;
          totalIncome += e.price;
        }
      });
      setStatistic({
        ...statistic,
        totalCukur,
        totalIncome,
        avgRating: 0 || +(avg).toFixed(1),
      });
    }
  }, [orders, votes]);
  const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setToken(token);
      const response = await axios.get(`${baseUrl}/ordersBarber`, {
        headers: {
          access_token: token,
        },
      });
      if (response.data.length > 0) {
        const responseVotes = await axios.get(
          `${baseUrl}/votes/${response.data[0].barberId}`,
          {
            headers: {
              access_token: token,
            },
          }
        );
        setVotes(responseVotes.data);
      }
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };
  const tokenlogin = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        setToken(value);
        navigation.navigate("Dashboard");
        // console.log('masukÃ©s')
      } else {
        console.log("tidak masuks");
      }
    } catch (error) {
      console.log(error, `>>>>>>`);
    }
  };
  useEffect(async () => {
    requestPermissions();
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
    setIsMounted(true);
    getOrders().then(() => {
      setOrdersByDate(orders);
    });
  }, []);
  const list = ({ item }) => {
    return (
      <View style={styles.cardDashboard2} key={item.id}>
        <View style={{ justifyContent: "center" }}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 5,
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#282c34", fontSize: 16, fontWeight: "bold" }}
            >
              Schedule :{" "}
            </Text>
            <Text
              style={{ color: "#282c34", fontSize: 16, fontWeight: "bold" }}
            >
              {item.hour}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginBottom: 5,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#282c34", fontSize: 16, fontWeight: "bold" }}
            >
              Price :{" "}
            </Text>
            <Text
              style={{ color: "#282c34", fontSize: 16, fontWeight: "bold" }}
            >
              {priceFormatter(item.price)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              marginBottom: 5,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ color: "#282c34", fontSize: 16, fontWeight: "bold" }}
            >
              Service :{" "}
            </Text>
            <Text
              style={{ color: "#282c34", fontSize: 16, fontWeight: "bold" }}
            >
              {item.Service.name}
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => toDetail(item.id)}>
              <Text
                style={{
                  color: "#ddd9d6",
                  backgroundColor: "#282c34",
                  width: 150,
                  marginTop: 10,
                  fontWeight: "bold",
                  borderRadius: 10,
                  paddingHorizontal: 30,
                  textAlignVertical: "center",
                  textAlign: "center",
                  padding: 5,
                }}
              >
                DETAIL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "-" +
      (tempDate.getMonth() + 1) +
      "-" +
      tempDate.getFullYear();
    let splitReverse = fDate.split("-").reverse();
    let fTime =
      "Hours: " + tempDate.getHours() + "| Minutes: " + tempDate.getMinutes();
    let splitted = fDate.split("-");
    let formatted = [null, null, null];
    if (splitted[0].length === 1) formatted[0] = "0" + splitted[0];
    else formatted[0] = splitted[0];
    if (splitted[1].length === 1) formatted[1] = "0" + splitted[1];
    else formatted[1] = splitted[1];
    formatted[2] = splitted[2];
    let selectedOrders = [];
    orders.forEach((e) => {
      if (
        e.date.split("T")[0].split("-").reverse().join("-") ===
        formatted.join("-")
      ) {
        selectedOrders.push(e);
      }
    });
    selectedOrders.sort((a, b) => {
      if (a.hour < b.hour) {
        return -1;
      }
      if (a.hour > b.hour) {
        return 1;
      }
      return 0;
    });

    setOrdersByDate(selectedOrders);

    setText(fDate);
  };
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setIsMounted(false);
    navigation.navigate("Login");
  };
  const toDetail = (id) => {
    setIsMounted(false);
    navigation.navigate("Detail", { orderId: id });
  };

  if (loading) {
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
    <View style={{ minHeight: windowHeight, backgroundColor: "#282c34" }}>
      <View
        style={{
          margin: 16,
          alignItems: "flex-end",
        }}
      >
        <AntDesign
          style={logout}
          onPress={logout}
          name="logout"
          size={24}
          color="#ffff"
        />
      </View>
      <View style={styles.headerController}>
        <Text style={styles.firstText}>Hello, user!</Text>
        <Text style={styles.secondText}>Goals and achievement</Text>
        <Text style={styles.firstText}>Today's activity:</Text>
      </View>
      <TouchableOpacity style={{marginBottom: 15}} onPress={() => showMode("date")}>
          <Text style={{color: "#ddd9d6", paddingVertical: 5, paddingHorizontal: 10, width:150, textAlign:"center", alignSelf:"center", borderRadius:20, borderColor:"#ddd9d6", borderWidth:2}}>CHOOSE A DATE</Text>
        </TouchableOpacity>
      <View
        style={{
          marginTop: 2,
          width: 369,
          marginLeft: 12,
          marginBottom: 8,
        }}
      >
        
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <StatusBar style="auto" />
      <SafeAreaView>
        <View style={styles.cardHandler}>
          <View style={[styles.cardDashboard, styles.flexDirDashboard]}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.handleCard}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.recordText}>Total cut</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#282c34",
                    }}
                  >
                    {statistic.totalCukur}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.recordText}>Total Income</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#282c34",
                    }}
                  >
                    {priceFormatter(statistic.totalIncome)}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <Text style={styles.recordText}>Rating Average</Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "#282c34",
                    }}
                  >
                    {statistic.avgRating}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 20 }}>
          <FlatList
            data={ordersByDate}
            renderItem={list}
            horizontal
            keyExtractor={(e) => e.id}
          />
        </View>
        {/* <Button onPress={logout} title="Log Out" /> */}
      </SafeAreaView>
    </View>
  );
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  try {
    if (error) {
      console.log(error, `>>>>>>>>>`);
      return;
    }
    if (data) {
      const { locations } = data;
      const token = await AsyncStorage.getItem("token");
      if (token !== null) {
        console.log(
          locations[0].coords.latitude,
          locations[0].coords.longitude
        );
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
        console.log("tidak masuks");
      }
    }
  } catch (error) {
    console.log(error, `>>>SSS`);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
  headerController: {
    marginTop: 30,
    margin: 16,
  },
  firstText: {
    fontSize: 14,
    color: "#ddd9d6",
  },
  recordText: {
    marginRight: 100,
    fontWeight: "bold",
    color: "#282c34",
    fontSize: 16,
    textTransform: "capitalize",
  },
  secondText: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 16,
    color: "#ddd9d6",
  },
  handleCard: {
    justifyContent: "space-between",
  },
  cardHandler: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerView: {
    flex: 1,
    alignItems: "center",
  },
  cardDashboard: {
    marginBottom: 10,
    backgroundColor: "#4682B4",
    height: 150,
    width: 370,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logout: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
  cardDashboard2: {
    marginBottom: 20,
    backgroundColor: "#4682B4",
    height: 150,
    width: 370,
    borderRadius: 7,
    marginLeft: 12,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textDashboard: {
    fontWeight: "bold",
    color: "#ffff",
    marginVertical: 10,
  },
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
  flexDirDashboard: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
