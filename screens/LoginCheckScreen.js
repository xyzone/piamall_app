import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, {useState, useContext, useEffect} from 'react'
import {   StyleSheet,
    View, 
    ImageBackground,
    Dimensions,
    LayoutAnimation,
    UIManager,
    KeyboardAvoidingView, } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Button, ThemeProvider, Text } from 'react-native-elements';
import { Context as AuthContext, Provider as AuthProvider } from '../contexts/AuthContext'; 
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function LoginScreen({navigation}) {

   
    const [loginToken, setLoginToken] = useState('')
    const { authState, login, validateLogin } = useContext(AuthContext)

    const checkLogin = async() => {
        const auth_token = await validateLogin();
        setLoginToken(auth_token) 
        if (auth_token != ''){
            navigation.navigate('Main')
        } else{
            navigation.navigate('LoginPanel')
        }
    }

    useEffect( () => {  
      checkLogin() 
    }, [])
 
    return (
        <View style={styles.container}>  
            <Text>Please wait for processing....</Text>
           
          
        </View>
    )
}


LoginScreen.navigationOptions = {
    header: null,
  };
 
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


    rowSelector: {
      height: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectorContainer: {
      flex: 1,
      alignItems: 'center',
    },
    selected: {
      position: 'absolute',
      borderRadius: 50,
      height: 0,
      width: 0,
      top: -5,
      borderRightWidth: 70,
      borderBottomWidth: 70,
      borderColor: 'white',
      backgroundColor: 'white',
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
    bgImage: {
      flex: 1,
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
    categoryText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 24,
      fontFamily: 'light',
      backgroundColor: 'transparent',
      opacity: 0.54,
    },
    selectedCategoryText: {
      opacity: 1,
    },
    titleText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'regular',
    },
    helpContainer: {
      height: 64,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });  