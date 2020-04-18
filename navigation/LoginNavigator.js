import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';  
import LoginCheckScreen from '../screens/LoginCheckScreen';  

const LoginNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function LoginNavigator({ navigation, route }) { 
  navigation.setOptions({ headerTitle: getHeaderTitle(route)  });
  return (
    <LoginNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
       <LoginNavi.Screen
        name="LoginCheck"
        component={LoginCheckScreen}
        options={{
          title: 'Login Check',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />     
      <LoginNavi.Screen
        name="LoginPanel"
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
    case 'Login':
      return 'Login';
  }
}
