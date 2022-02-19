import React from "react";
import { styles } from "../styling";
import { SafeAreaView, StatusBar, Text, View } from "react-native";

export default function DashboardScreen() {
  return (

    <View>
      <StatusBar style='auto' />
      <SafeAreaView>
        <View style={[styles.cardDashboard, styles.flexDirDashboard]}>
          <View>
            <Text >Gambar</Text>
          </View>
          <View >
            <Text style={styles.textDashboard}>Total Cukur</Text>
            <Text style={styles.textDashboard}>Total Income</Text>
            <Text style={styles.textDashboard}>Total Upvote</Text>
          </View>
        </View>
        <View style={styles.cardDashboard}>
          <Text>Date picker(pake npm)</Text>
        </View>
        <View style={styles.cardDashboard}>
          <Text>Table untuk navigasi blablabla(pake npm)</Text>
        </View>
      </SafeAreaView>
    </View>
  )
}