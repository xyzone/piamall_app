import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
 
import LoginScreen from '../screens/LoginScreen';  
import LoginCheckScreen from '../screens/LoginCheckScreen';  

const LoginNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Login Home';
 
LoginNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null  
};

export default function LoginNavigator() { 
  return (
    <LoginNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false
      }}
    >
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
          headerTitle: 'PIA Mall Login',
          headerLeft: null,          
        }}
      />     
    </LoginNavi.Navigator>
  );
}