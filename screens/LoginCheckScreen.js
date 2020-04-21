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
    const { authState, login, validateLogin } = useContext(AuthContext)
  
    useEffect( () => {  
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