
import * as React from 'react'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator'; 
import CartNavigator from './CartNavigator';  
import MallNavigator from './MallNavigator'; 
import OrderNavigator from './OrderNavigator';
import { DrawerContent } from './DrawerContent';
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}> 
      <Drawer.Screen name="MallNavi" component={ MallNavigator } />    
      <Drawer.Screen name="ShoppingCartNavi" component={CartNavigator} />
      <Drawer.Screen name="OrderNavigator" component={ OrderNavigator } />  
      <Drawer.Screen name="AccountNavi" component={ BottomTabNavigator } />      
    </Drawer.Navigator>
  );
} 
