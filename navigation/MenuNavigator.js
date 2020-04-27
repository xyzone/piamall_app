
import * as React from 'react';
 
import { View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import AccountNavigator from '../navigation/AccountNavigator'; 
import HomeScreen from '../screens/Mall/HomeScreen';  
function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function MenuNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="SubMain" component={ BottomTabNavigator } />     

     <Drawer.Screen name="MenuHomeScreen" component={ HomeScreen } />    
      <Drawer.Screen name="Account" component={AccountNavigator} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
} 


