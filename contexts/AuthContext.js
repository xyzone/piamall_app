/* eslint-disable react/prop-types */
import React, {createContext, useReducer} from 'react'
import {AsyncStorage} from 'react-native';  
import {navigateTo} from '../navigation/RootNavigation'; 
import { ValidateClientApi, AuthClientApi, LogoutClientApi } from '../apis/PIAMallApi'; 
import MapDataContext from './mapDataContext'
 
const initialValue = {
    is_login: false,
    authToken: '',
    loginMessage: ''
}


const _authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {...state, loginMessage: '', is_login: action.payload.is_login, 
                    authToken: action.payload.authToken};
        case 'logout':
            return {...state, is_login: false, authToken: '', loginMessage: ''};
        case 'show_message':
            return {...state, loginMessage: action.payload};        
        default:
            break;
    }
} 

const login = (dispatch) => {
    return(
        async(username, password) => { 
            if (!username || !password){
                dispatch({
                    type: 'show_message',  
                    payload: 'Failed to login! Message: need input username and password'});
                return false
            } 
            let api_response = await AuthClientApi(username, password)             
            if (api_response.data.result){ 
                let token = api_response.data.user_token
                dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                await AsyncStorage.setItem('authToken', token)
                navigateTo('MainNavigator') 

            }else{
                dispatch({
                    type: 'show_message',  
                    payload: `Failed to login! Message: ${api_response.data.message}`})
            }   
        }
    )
}


const validateLogin = (dispatch) => { 
    return (
        async () => {
            const token = await AsyncStorage.getItem('authToken')
            if (token)
            {                
               let api_response = await ValidateClientApi(token)
               if (api_response.data.result){ 
                   dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                   // navigateTo('Main1Navigator')
               }else{
                   dispatch({type: 'logout'}) 
                   navigateTo('LoginNavigator', {screen: 'LoginScreen'})
               } 
            }else{
                navigateTo('LoginNavigator', {screen: 'LoginScreen'})
            }
            
        }
    )
}

const logout = (dispatch) => {
    return (
        async () => {
            const token = await AsyncStorage.getItem('authToken')
            if (token)
            {                
                await LogoutClientApi(token)
                await AsyncStorage.setItem('authToken', '');
                dispatch({type: 'logout'}) 
                navigateTo('LoginNavigator', {screen: 'LoginScreen'})
            }else{
                navigateTo('LoginNavigator', {screen: 'LoginScreen'})
            }
            
        }
    )
}
 
const authContext = createContext()

const authProvider = (props) => { 
    const [state, dispatch] = useReducer(_authReducer, initialValue)    
    return (
        <authContext.Provider value={
            {'authState': state,  
             'login': login(dispatch), 
             'validateLogin': validateLogin(dispatch),
             'logout': logout(dispatch)
             }}>
            {props.children}
        </authContext.Provider>
    )
} 
//export const {Context, Provider} = {Context: authContext, Provider: authProvider}
 
const mapContext = MapDataContext(_authReducer, 'authState', 
                                  {login, validateLogin, logout}, initialValue)
export const {Context, Provider} = mapContext