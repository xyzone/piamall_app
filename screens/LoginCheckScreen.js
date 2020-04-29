import * as React  from 'react'
import {   StyleSheet, View  } from 'react-native'; 
import { Text } from 'react-native-elements';
import { Context as AuthContext  } from '../contexts/AuthContext'; 
 

export default function LoginCheckScreen({navigation}) { 
    const { validateLogin } = React.useContext(AuthContext)
  
    React.useEffect( () => {  
      validateLogin()
    }, []) 
    return (
        <View style={styles.container}>  
            <Text>Please wait for processing....</Text>
           
          
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  