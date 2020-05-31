
import * as React from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator'; 
import CartNavigator from './CartNavigator';  
import MallNavigator from './MallNavigator' 
import { DrawerContent } from './DrawerContent';
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}> 
      <Drawer.Screen name="Mall Home" component={ MallNavigator } />    
      <Drawer.Screen name="ShoppingCartScreen" component={CartNavigator} /> 
      <Drawer.Screen name="My Account" component={ BottomTabNavigator } />      
    </Drawer.Navigator>
  );
} 
