import * as React from 'react'
import {   
  StyleSheet, View, Dimensions, KeyboardAvoidingView} from 'react-native'; 

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import { Context as AuthContext } from '../contexts/AuthContext'; 
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function LoginScreen({navigation}) {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('') 
    const { authState, login } = React.useContext(AuthContext)
 
    React.useEffect( () => {  
      
    }, [])

    return (
        <View style={styles.container}>  
            <Text>{authState.authToken}</Text>
            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior="position">
                <View style={styles.loginContainer}>
                <View style={styles.formContainer}>
                    <Input
                        leftIcon={
                            <Icon
                                name="envelope-o"
                                type="font-awesome"
                                color="rgba(0, 0, 0, 0.38)"
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        } 
                        keyboardAppearance="light"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        inputStyle={{ marginLeft: 8 }}
                        placeholder={'Email'}
                        containerStyle={{
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}                                     
                        onChangeText = { (text) => {setUsername(text)}}
                    />
                    <Input 
                        leftIcon={ 
                            <Icon
                                name="lock"
                                type="simple-line-icon"
                                color="rgba(0, 0, 0, 0.38)"
                                size={30}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        } 
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true} 
                        blurOnSubmit={true}
                        containerStyle={{
                            marginTop: 16,
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 13 }}
                        placeholder={'Password'}
                        onChangeText = { (text) => {setPassword(text)}}
                    />

                    <Button  
                        title="Login"
                        containerStyle={{ flex: -1 }}
                        buttonStyle={styles.loginButton} 
                        titleStyle={styles.loginTextButton} 
                        onPress={()=>{login(username, password)}}
                    /> 

                </View>    
                {authState.loginMessage? <Text style={styles.errorMessage}>{authState.loginMessage}</Text>: null}
                </View>
            </KeyboardAvoidingView> 
        </View>
    )
}
  
  const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    
    container: {
      flex: 1,
    },

 
    loginContainer: {
        marginTop: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTextButton: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    loginButton: {
      marginTop: 10,  
      //backgroundColor: 'rgba(232, 147, 142, 1)',
      borderRadius: 15,
      height: 50,
      width: 200,
    },
    titleContainer: {
      height: 150,
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    formContainer: {
      backgroundColor: 'white',
      width: SCREEN_WIDTH ,
      borderRadius: 10,
      paddingTop: 32,
      paddingBottom: 32,
      alignItems: 'center',
    },
    loginText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    
    titleText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'regular',
    },
     
  });  