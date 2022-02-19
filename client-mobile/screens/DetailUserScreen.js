import React from "react";
import { styles } from "../styling";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

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