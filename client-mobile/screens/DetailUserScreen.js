
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

export default function DetailUserScreen() {
  return (

    <View>
      <StatusBar style='auto' />
      <SafeAreaView>
        <View style={styles.cardUserDetail}>
          <Text>Nama</Text>
          <Text>Alamat</Text>
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
