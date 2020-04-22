import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon'; 
import AccountScreen from '../screens/Account/AccountScreen';  

const AccountNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Accout Home';
AccountNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function AccountNavigator({ navigation, route }) { 
  return (
    <AccountNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
       <AccountNavi.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          headerTitle: 'AccountScreen',
          
        }}
      />     
       
    </AccountNavi.Navigator>
  );
}