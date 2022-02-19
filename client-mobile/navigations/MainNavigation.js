import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DetailJob from '../screens/DetailJobScreen';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator()

export default function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name='Bottom Tab'
        component={BottomTab} />
      <Stack.Screen
        name='DetailJob'
        component={DetailJob} />

    </Stack.Navigator>
  );
}