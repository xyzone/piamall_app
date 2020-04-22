import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon'; 
import CartNavigator from '../navigation/CartNavigator';
import AccountNavigator from '../navigation/AccountNavigator'; 
import OrderNavigator from '../navigation/OrderNavigator';  
import MallNavigator from '../navigation/MallNavigator'
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Mall"
        component={MallNavigator}
        options={{
          title: 'Mall',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
      <BottomTab.Screen
        name="ShoppingCart"
        component={CartNavigator}
        options={{
          title: 'Shopping Cart',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-basket" />,
        }}
      />
     <BottomTab.Screen
        name="Orders"
        component={OrderNavigator}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-filing" />,
        }}
      />    
      <BottomTab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-contact" />,
        }}
      /> 
     
   
    </BottomTab.Navigator>


 
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'PIA Mall';
    case 'ShoppingCart':
      return 'Shopping Cart';
    case 'Account':
      return 'My Account';
    case 'Orders':
      return 'Orders';
  }
}
