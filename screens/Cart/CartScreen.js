import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { SearchBar, ListItem, Header } from 'react-native-elements';
import {Button, List, Divider } from 'react-native-paper';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../../contexts/AuthContext'
import { GetShoppingCart, ValidateCheckout } from '../../apis/PIAMallApi'
import { NavBarScreen }  from '../NavbarScreen';
export default function CartScreen({navigation}) {
  const { validateLogin} = React.useContext(AuthContext)
  const [shoppingCart, setShoppingCart] = React.useState({})
  async function refreshShoppingCart(){
    setShoppingCart({}) 
    let sc_cart = await GetShoppingCart() 
    if (sc_cart.data.result){  
      setShoppingCart(sc_cart.data.instances.data[0]) 
    }  
  } 

  async function validateCart(){
    let result = await ValidateCheckout()
    if(result.data.result){
      navigation.navigate('CheckoutScreen');
    }
    else{ 
      return false
    }
  }

  React.useEffect(() =>{ 
    async function checkLogin(){
      await validateLogin()
    } 
    checkLogin()  
  }, [])
  
  React.useEffect(() =>{  
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action 
      refreshShoppingCart()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation])
  
  const renderCartProduct = ({ item }) => { 
    return (
      
        <ListItem
          key={item.scp_id}
          title={item.product.product_name}
          subtitle={`Price: \$${item.scp_price}  Reward Points: ${item.scp_reward_points}` } 
          leftAvatar={ 
            item.product.primary_image_url? {source: {uri:  item.product.primary_image_url  }} : {title: item.product.product_name}
           }
          bottomDivider
          chevron
        />
     
    )
  }

  const renderBillAddress = () => {
    return(
      `Name: ${shoppingCart.billing_address.bill_name} \n Address: ${shoppingCart.billing_address.bill_street} ${shoppingCart.billing_address.bill_street2},
      ${shoppingCart.billing_address.bill_suburb}, ${shoppingCart.billing_address.bill_state} ${shoppingCart.billing_address.bill_postcode}
      Australia `  )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        {shoppingCart.billing_address? 
        <View> 
          <List.Item 
            title="Billing Name"
            description={
               
              <Text numberOfLines={1}>
              {shoppingCart.billing_address.bill_name}  
              </Text>
               
              }
          /> 
          <List.Item 
            title="Billing Address"
            description={
               
            <Text numberOfLines={2}>
              {shoppingCart.billing_address.bill_street} {shoppingCart.billing_address.bill_street2},
    {shoppingCart.billing_address.bill_suburb}, {shoppingCart.billing_address.bill_state} {shoppingCart.billing_address.bill_postcode}
            </Text> 
            }
          /> 
          
       <Divider />
          {shoppingCart.scps? 
              <FlatList keyExtractor={item => item.scp_id.toString()}  
              data={shoppingCart.scps}  renderItem={renderCartProduct}  
              contentContainerStyle={{ flexGrow: 1}}  /> 
              :
              <Text>No any product found</Text>
            } 


        </View>  
          :          
        <Text>Wait for processing</Text>}  
        <Divider />
        <Button 
            color="#4cb051" 
            style={{marginRight:5}}
            labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-right-bold-circle"  mode="contained" 
            
            onPress={() => validateCart()} >
              Checkout with Payment
            </Button>    
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
