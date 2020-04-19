import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen';  
import LoginCheckScreen from '../screens/LoginCheckScreen';  

const LoginNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Home';
LoginNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function LoginNavigator({ navigation, route }) { 
  return (
    <LoginNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
       <LoginNavi.Screen
        name="LoginCheck"
        component={LoginCheckScreen}
        options={{
          headerTitle: 'Login Redirect',
          
        }}
      />     
      <LoginNavi.Screen
        name="LoginPanel"
        component={LoginScreen}
        options={{
          headerTitle: 'Login Here',
          headerLeft: null,          
        }}
      />     
    </LoginNavi.Navigator>
  );
}