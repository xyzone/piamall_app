import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';  
import { Button, Text } from 'react-native-elements';
import { Context as AuthContext } from '../../contexts/AuthContext'; 
 

export default function OrderDetailScreen({navigation}) { 
    const { validateLogin } = useContext(AuthContext)
  
    useEffect( () => {  
      async function checkLogin(){
        await validateLogin()
      } 
      checkLogin() 
    }, []) 
     
    return (
        <View style={styles.container}>  
            <Text>Category Screen.</Text>
            <Button  
                title="List Order!"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('OrderScreen')}}
            />           
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  