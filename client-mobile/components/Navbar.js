import { Text, Button, View, StatusBar, TouchableOpacity } from 'react-native';
import { styles } from '../styling';

export default function Navbar({ navigation }) {
  return (
    <View style={styles.navbar}>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.buttonMargin} onPress={() => navigation.navigate('Home')}><Text>To Home</Text></TouchableOpacity>
      <Button style={styles.buttonMargin} onPress={() => navigation.navigate('List')} title="To List" />
      <Button style={styles.buttonMargin} onPress={() => navigation.navigate('Detail')} title="To Detail" />
    </View>
  );
}


