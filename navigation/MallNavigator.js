import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Mall/HomeScreen';  
import CategoryScreen from '../screens/Mall/CategoryScreen';  
import ProductScreen from '../screens/Mall/ProductScreen';  

const MallNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'Mall Home';
MallNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function MallNavigator({ navigation, route }) { 
  return (
    <MallNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}>
       <MallNavi.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'Mall Home',
          
        }}
      />     
      <MallNavi.Screen
        name="CategorySreen"
        component={CategoryScreen}
        options={{
          headerTitle: 'CategoryScreen',
          headerLeft: null,          
        }}
      />         
      <MallNavi.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={{
          headerTitle: 'ProductScreen',
          headerLeft: null,          
        }}
      />   
    </MallNavi.Navigator>
  );
}