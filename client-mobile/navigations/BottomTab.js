import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import DetailUserScreen from '../screens/DetailUserScreen';
import CompanyList from '../screens/CompanyListScreen';
import JobList from '../screens/JobListScreen';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}>
        <Tab.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
         />
        <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
         />
        <Tab.Screen
        name="Detail"
        component={DetailUserScreen}
        options={{ title: 'Detail' }}
         />
      {/* <Tab.Screen
        name="Home"
        component={LandingScreen}
        options={{ title: 'BARPLAYS' }} />
      <Tab.Screen
        name="List"
        component={JobList}
        options={{ title: "Job List" }} />
      <Tab.Screen
        name="Company"
        component={CompanyList}
        options={{ title: 'Company List' }} /> */}
    </Tab.Navigator>
  );
}