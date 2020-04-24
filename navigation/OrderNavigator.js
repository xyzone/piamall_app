import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';
 
import OrderScreen from '../screens/Order/OrderScreen';  
import OrderDetailScreen from '../screens/Order/OrderDetailScreen';   

const OrderNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Order Home';
OrderNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function OrderNavigator({ navigation, route }) { 
  return (
    <OrderNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
       <OrderNavi.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          headerTitle: 'OrderScreen',
          
        }}
      />     
      <OrderNavi.Screen
        name="OrderDetailScreen"
        component={OrderDetailScreen}
        options={{
          headerTitle: 'OrderDetailScreen',
          headerLeft: null,          
        }}
      />         
     
    </OrderNavi.Navigator>
  );
}