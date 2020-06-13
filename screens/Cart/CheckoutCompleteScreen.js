  
import React, {useContext, useEffect, useState} from 'react'
import {   StyleSheet, View , ScrollView } from 'react-native'; 
import { CheckBox } from 'react-native-elements';
import { RadioButton, Divider, Button, Paragraph, Title, Subheading } from 'react-native-paper';
import { Text } from 'react-native-elements';
import { ProcessCheckout } from '../../apis/PIAMallApi'
import { Context as AuthContext } from '../../contexts/AuthContext';  

export default function CheckoutCompleteScreen({navigation, route}) { 
    const { validateLogin } = useContext(AuthContext) 
    const { order_data } = route.params 
   
    useEffect( () => {  
      async function checkLogin(){
        await validateLogin()
      } 
      checkLogin() 
    }, []) 
    return (
        <ScrollView style={styles.container}>   
            <Title>Thank you, the order ID is {order_data.order_id}</Title>
            <Subheading>Made at {order_data.order_time}</Subheading>
            <Paragraph>
                Amount: ${order_data.order_amount}
            </Paragraph>
            <Paragraph>

             Points: {order_data.order_points}
            </Paragraph>
            <Divider />
            <Button 
              color="#4cb051" 
              style={{marginRight:5}}
              labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-right-bold-circle"  mode="contained" 
              onPress={() => navigation.navigate('OrderNavigator', {screen: 'OrderDetailScreen', params: {order_data}}) } >
              View Order {order_data.order_id} Detail
            </Button>  
        </ScrollView>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
      paddingLeft:10,
      paddingRight: 10,
      paddingTop: 20,

    },

 
  });  