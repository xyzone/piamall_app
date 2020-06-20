import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';

import {Button, Text } from 'react-native-paper'; 
import OrderScreen from '../screens/Order/OrderScreen';  
import OrderDetailScreen from '../screens/Order/OrderDetailScreen';   

const OrderNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'OrderScreen';
OrderNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function OrderNavigator({navigation}) { 
  return (
    <OrderNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
       <OrderNavi.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerTitle: 'Orders',
          headerRight: () => (            
            <Button 
            color="#345678" 
            style={{marginRight:5}}
            labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-left-bold-circle"  mode="contained" 
            
            onPress={() => navigation.navigate('HomeScreen') } >
              Back to Home 
            </Button> 
          ),
          
        }}
      />     
      <OrderNavi.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          headerTitle: '',
          headerLeft: null, 
          headerRight: () => (            
            <Button 
            color="#345678" 
            style={{marginRight:5}}
            labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-left-bold-circle"  mode="contained" 
            
            onPress={() => navigation.navigate('OrderScreen') } >
              Back to Order List 
            </Button>
             
          ),         
        }}
      />         
     
    </OrderNavi.Navigator>
  );
}