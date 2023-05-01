import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewUser from './src/pages/NewUser/Index';
import Login from './src/pages/Login/Index';
import Student from './src/pages/Student/Index';
import Advisor from './src/pages/Advisor/Index';

import AddArea from './src/pages/AddArea/Index';


const Stack = createStackNavigator();

export default function App() {
  
  return (
      <NavigationContainer>
      <Stack.Navigator screenOptions={{
				headerShown: false
			}}>
			 <Stack.Screen  name="Login" component={Login} />
        <Stack.Screen  name="NewUser" component={NewUser} /> 
				<Stack.Screen  name="AddArea" component={AddArea} />
        <Stack.Screen  name="Student" component={Student} /> 
        <Stack.Screen  name="Advisor" component={Advisor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    justifyContent: 'center',
  },
});
