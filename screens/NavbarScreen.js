import * as React  from 'react'
 
import {   StyleSheet, View, TouchableOpacity  } from 'react-native'; 
import { Text, Button, Block, NavBar, Icon } from 'galio-framework' 
import theme from '../constants/Themes';

export default function NavBarScreen({navigation}){
    return(
        <NavBar
            title="Mall"
            left={(
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon 
                  name="menu"
                  family="feather"
                  size={theme.SIZES.BASE}
                  color={theme.COLORS.ICON}
                />
              </TouchableOpacity>
            )}
            right= {(
              <TouchableOpacity onPress={() => navigation.navigate('Main', {screen: 'Shopping Cart'})}>
              <Icon 
                name="shopping-cart"
                family="feather"
                size={theme.SIZES.BASE}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
            )} 
            style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
          /> 
    )
}