import React, {useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../contexts/AuthContext'; 

const CheckSignScreen = (navigation) => {
    const { validateLogin } = useContext(AuthContext)

    useEffect(() => {
        
        validateLogin()

    }, [])

    return (
        <View>
            <Text>Please wait .... </Text>
        </View>
    )
}
 
 
export default CheckSignScreen;