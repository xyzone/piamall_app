import { createStackNavigator } from '@react-navigation/stack';
import {DrawerButton, View} from 'react-native';

import {Button, Text } from 'react-native-paper';
import * as React from 'react';
 
import CartScreen from '../screens/Cart/CartScreen';   
import CheckoutScreen from '../screens/Cart/CheckoutScreen';   
import CheckoutCompleteScreen from '../screens/Cart/CheckoutCompleteScreen'; 
const CartNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'CartScreen';
CartNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function CartNavigator({ navigation, route }) { 
  return (
    <CartNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
      
       <CartNavi.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          headerLeft: () => (<Text>Shopping Cart</Text>), 
          headerTitle: '',
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
      <CartNavi.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerLeft: () => (<Text>Payment</Text>), 
          headerTitle: '',
          headerRight: () => (            
            <Button 
            color="#345678" 
            style={{marginRight:5}}
            labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-left-bold-circle"  mode="contained" 
            
            onPress={() => navigation.navigate('CartScreen') } >
              Back to Cart
            </Button>
             
          ),        
        }}
      />         
      <CartNavi.Screen
        name="CheckoutCompleteScreen"
        component={CheckoutCompleteScreen}
        options={{
          headerLeft: () => (<Text>Order Completed</Text>), 
          headerTitle: '',
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
    </CartNavi.Navigator>
  );
}