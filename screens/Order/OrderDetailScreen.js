import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';  
import { Button, Text } from 'react-native-elements';
import { Context as AuthContext } from '../../contexts/AuthContext'; 
 
import { GetOrderDetail } from '../../apis/PIAMallApi';

export default function OrderDetailScreen({navigation, route}) { 
    const { validateLogin } = useContext(AuthContext)
    const { token } = route.params 
    const [orderDetail, setOrderDetail] = React.useState(null)
    async function refreshOrderDetail(order_token){
      api_response = await GetOrderDetail(order_token)
      if(api_response.data.result){
        setOrderDetail(api_response.data.instances.data[0])
      }
  }
  
  React.useEffect(() =>{  
    const unsubscribe = navigation.addListener('focus', () => {
  
      refreshOrderDetail(token)
    });

    return unsubscribe;
  }, [navigation])
  

    useEffect( () => {  
      async function checkLogin(){
        await validateLogin()
      } 
      checkLogin() 
    }, []) 
     
    return (
      
        <View style={styles.container}>   
        {orderDetail?
            <View>
            <Text>Order ID.{orderDetail.id}</Text>
            <Text>Order Token {orderDetail.token}</Text> 
            <Text>Order Token {orderDetail.id}</Text>
            <Button  

                title="List Order!"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('OrderScreen')}}
            />
            </View>  
             :<Text>Processing</Text>
      }        
        </View>
       
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  