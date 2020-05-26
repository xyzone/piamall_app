
import * as React from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator'; 
import CartNavigator from './CartNavigator';  
import MallNavigator from './MallNavigator'  
const Drawer1 = createDrawerNavigator();

export default function Main1Navigator() {
  return (
    <Drawer1.Navigator> 
      <Drawer1.Screen name="Mall Home" component={ MallNavigator } />    
      <Drawer1.Screen name="Shopping Cart" component={CartNavigator} /> 
      <Drawer1.Screen name="My Account" component={ BottomTabNavigator } />      
    </Drawer1.Navigator>
  );
} 