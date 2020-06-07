import { createStackNavigator } from '@react-navigation/stack';
import {DrawerButton} from 'react-native'
import * as React from 'react';
 
import CartScreen from '../screens/Cart/CartScreen';   
import CheckoutScreen from '../screens/Cart/CheckoutScreen';   
 
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
          headerTitle: 'CartScreen', 
          headerLeft: () => (
            <DrawerButton onPress={() => navigation.toggleDrawer()} />
          ),
        }}
      />     
      <CartNavi.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          headerTitle: 'CheckoutScreen',
          headerLeft: null,          
        }}
      />         
      
    </CartNavi.Navigator>
  );
}