import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen'; 

const LoginNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function LoginNavigator({ navigation, route }) { 
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <LoginNavi.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <LoginNavi.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Login',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
     
    </LoginNavi.Navigator>
 
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
