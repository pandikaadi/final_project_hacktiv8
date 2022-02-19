import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainNavigation from './navigations/MainNavigation';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './config/apolloConnection'


const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <Stack.Screen name='Main Navigation' component={MainNavigation} />
          </Stack.Navigator>
        </NavigationContainer>
    </ApolloProvider>
  );
}

