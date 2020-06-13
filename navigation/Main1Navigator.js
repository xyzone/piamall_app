
import * as React from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator'; 
import CartNavigator from './CartNavigator';  
import MallNavigator from './MallNavigator'  
const Drawer1 = createDrawerNavigator();

export default function Main1Navigator() {
  return (
    <Drawer1.Navigator> 
      <Drawer1.Screen name="MallNavi" component={ MallNavigator } />    
      <Drawer1.Screen name="ShoppingCartNavi" component={CartNavigator} /> 
      <Drawer1.Screen name="OrderNavigator" component={ OrderNavigator } />  
      <Drawer1.Screen name="AccountNavi" component={ BottomTabNavigator } />      
    </Drawer1.Navigator>
  );
} 
