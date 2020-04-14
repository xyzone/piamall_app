import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';


export default function LoginScreen({navigation}) {
    return (
        <View>
        <Text>Login Here</Text>
        <Button title='Go to Profie' onPress={()=>navigation.navigate('Mall')}></Button>
        </View>
    )
}


LoginScreen.navigationOptions = {
    header: null,
  };
  