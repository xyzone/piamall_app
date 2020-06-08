  
import React, {useContext, useEffect, useState} from 'react'
import {   StyleSheet, View  } from 'react-native'; 
import { CheckBox } from 'react-native-elements';
import { RadioButton, Divider, Button } from 'react-native-paper';
import { Text } from 'react-native-elements';
import { Context as AuthContext } from '../../contexts/AuthContext';  

export default function LoginScreen({navigation}) { 
    const { validateLogin } = useContext(AuthContext)
    const [payment, setPayment] = useState('dd')
  
    useEffect( () => {  
      async function checkLogin(){
        await validateLogin()
      } 
      checkLogin() 
    }, []) 
    return (
        <View style={styles.container}>   
           
            <CheckBox              
              title='Direct Deposit'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={payment === 'dd'}
              onPress={() => { setPayment('dd') }}
            />

            <CheckBox              
              title='Paypal'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={payment === 'pp'}
              onPress={() => { setPayment('pp') }}
            />
            <Divider />

            <Button 
              color="#4cb051" 
              style={{marginRight:5}}
              labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-right-bold-circle"  mode="contained" 
              onPress={() => navigation.navigate('CheckoutScreen') } >
              Submit Order
            </Button>  
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  