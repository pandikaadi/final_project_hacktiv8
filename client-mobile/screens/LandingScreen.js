import { Text, View, StatusBar, Image, FlatList, ImageBackground } from 'react-native';
import { styles } from '../styling/';

const image = { uri: 'https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80' }
export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground source={image} style={styles.imageBackground}>
        <Image
          style={styles.imageLanding}
          source={require('../assets/barplays.png')}
        />
        <Text style={styles.textCenter}>Discover our world. Explore your future.</Text>
      </ImageBackground>
    </View>
  );
}


