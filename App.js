import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewUser from './Pages/NewUser/Index';
import Login from './Pages/Login/Index';
import Student from './Pages/Student/Index';
import Advisor from './Pages/Advisor/Index';
import List from './Pages/Student/List';
import Msg from './Pages/Student/Msg';
import Task from './Pages/Student/Task';
import AddArea from './Pages/AddArea/Index';


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
