import * as React  from 'react'
 
import { StyleSheet, View, TouchableOpacity  } from 'react-native'; 
import { Text, Button, Block, NavBar, Icon } from 'galio-framework' 
import theme from '../constants/Themes';

export function NavBarScreen({navigation}){
    return(
        <NavBar
            title="Mall Home"
            left={(
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Icon 
                  ios='ios-menu' android="md-menu" s
                  name="menu"
                  family="feather"
                  size={theme.SIZES.BASE}
                  color={theme.COLORS.ICON}
                />
              </TouchableOpacity>
            )}
            right= {(
              <TouchableOpacity onPress={() => navigation.navigate('ShoppingCartNavi', {screen: 'CartScreen'})}>
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

export function NavbarCategoryScreen({route, navigation}) {
  const { param_chosen_category } = route.params 
  return(
    <NavBar
        title={param_chosen_category.category_name}
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
          <TouchableOpacity onPress={() => navigation.navigate('ShoppingCartNavi', {screen: 'CartScreen'})}>
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