  
import React, {useContext, useEffect, useState} from 'react'
import {   StyleSheet, View  } from 'react-native'; 
import { CheckBox } from 'react-native-elements';
import { RadioButton, Divider, Button } from 'react-native-paper';
import { Text } from 'react-native-elements';
import { ProcessCheckout } from '../../apis/PIAMallApi'
import { Context as AuthContext } from '../../contexts/AuthContext';  

export default function CheckoutScreen({navigation}) { 
    const { validateLogin } = useContext(AuthContext)
    const [payment, setPayment] = useState('DD')
  
    async function processPayment(payment_type){
      let result = await ProcessCheckout(payment_type)
      if(result.data.result){
        let order_data = result.data.instances.data; 
        navigation.navigate('CheckoutCompleteScreen', {order_data});
      }
      else{ 
        alert(result.data.message)
        return false
      }
    }
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
              checked={payment === 'DD'}
              onPress={() => { setPayment('DD') }}
            />

            <CheckBox              
              title='Paypal'
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              checked={payment === 'Paypal'}
              onPress={() => { setPayment('Paypal') }}
            />
            <Divider />

            <Button 
              color="#4cb051" 
              style={{marginRight:5}}
              labelStyle={{ color: "white", fontSize: 13 }}
              icon="arrow-right-bold-circle"  mode="contained" 
              onPress={() => processPayment(payment) } >
              Finalize Order
            </Button>  
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  