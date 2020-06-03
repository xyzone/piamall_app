import { createStackNavigator } from '@react-navigation/stack'

import * as React from 'react';
 
import HomeScreen from '../screens/Mall/HomeScreen';  
import CategoryScreen from '../screens/Mall/CategoryScreen';  
import ProductScreen from '../screens/Mall/ProductScreen';  
import SearchScreen from '../screens/Mall/ProductScreen';
const MallNavi = createStackNavigator();
const INITIAL_ROUTE_NAME = 'MallScreen';


MallNavi.navigationOptions = {
  headerMode: 'none',
  header: null,
  headerLeft: null
  
};

export default function MallNavigator({ navigation, route }) { 
  return (
    <MallNavi.Navigator  initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerShown: false
      }}
    > 
       <MallNavi.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'MallScreen',
          
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
      <MallNavi.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          headerTitle: 'SearchScreen',
          headerLeft: null,          
        }}
      />         
    
    </MallNavi.Navigator>
  );
}