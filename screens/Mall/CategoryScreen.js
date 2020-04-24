import * as React  from 'react'
import {   StyleSheet, View  } from 'react-native'; 
import { Button, Text } from 'react-native-elements';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
 

export default function LoginScreen({ navigation }) { 
    const { validateLogin } = React.useContext(AuthContext)
  
    React.useEffect( () => {  
      validateLogin()
    }, []) 
    return (
        <View style={styles.container}>  
            <Text>Category Screen.</Text>
            <Button  
                title="Check Product!"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('ProductScreen')}}
            /> 
          
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  