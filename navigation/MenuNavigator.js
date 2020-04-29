
import * as React from 'react';
 
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import AccountNavigator from '../navigation/AccountNavigator'; 
import CartNavigator from '../navigation/CartNavigator'; 
import OrderNavigator from '../navigation/OrderNavigator';  
import MallNavigator from '../navigation/MallNavigator'
import HomeScreen from '../screens/Mall/HomeScreen';  
  
const Drawer = createDrawerNavigator();

export default function MenuNavigator() {
  return (
    <Drawer.Navigator> 
      <Drawer.Screen name="Mall Home" component={ MallNavigator } />    
      <Drawer.Screen name="Shopping Cart" component={CartNavigator} /> 
      <Drawer.Screen name="My Account" component={ BottomTabNavigator } />      
    </Drawer.Navigator>
  );
} 


