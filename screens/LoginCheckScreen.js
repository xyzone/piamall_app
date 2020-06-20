import * as React  from 'react'
import {   StyleSheet, View  } from 'react-native'; 
import { Text } from 'react-native-elements';
import { Context as AuthContext  } from '../contexts/AuthContext'; 
 

export default function LoginCheckScreen({navigation}) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    React.useEffect( () => {  
      async function checkLogin(){
        await validateLogin(); 
        if(authState.is_login){
          navigation.navigate('MainNavigator')
        }else{
          navigation.navigate('LoginScreen')
        }
      }

      checkLogin();
      
    }, []) 
    return (
        <View style={styles.container}>  
            <Text>Please wait for processing....  </Text>
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  