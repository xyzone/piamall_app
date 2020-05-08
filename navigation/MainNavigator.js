
import * as React from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator'; 
import CartNavigator from './CartNavigator';  
import MallNavigator from './MallNavigator' 
  
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator> 
      <Drawer.Screen name="Mall Home" component={ MallNavigator } />    
      <Drawer.Screen name="Shopping Cart" component={CartNavigator} /> 
      <Drawer.Screen name="My Account" component={ BottomTabNavigator } />      
    </Drawer.Navigator>
  );
} 


