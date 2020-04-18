import React, {createContext, useReducer} from 'react'
import {AsyncStorage} from 'react-native';
import MapDataContext from './mapDataContext';
import {navigateTo} from '../navigation/RootNavigation'; 
import md5 from 'md5';
const initialValue = {
    is_login: false,
    authToken: null,
    loginMessage: ''
}


const _authReducer = (state, action) => {
    switch (action.type) {
        case 'login':
            return {...state, loginMessage: '', is_login: action.payload.is_login, authToken: action.payload.authToken}
            break;
        case 'show_message':
            return {...state, loginMessage: action.payload}        
        default:
            break;
    }
} 

const login = (dispatch) => {
    return(
        async(username, password, navigation) => { 

            if(username == 'richard'){
                dispatch({type: 'login', payload: {is_login: false, authToken: 'token-12345'}})
                navigateTo('Main')
                //navigation.navigate('Main') 
            }else{
                dispatch({type: 'show_message', payload: ' Failed to login, Email and password is not correct.'})
            }
            
        }
    )
}

const validateLogin = (dispatch) => {
    return (
        async () => {
            navigateTo('Signin')
        }
    )
}


const authContext = createContext()

const authProvider = (props) => {
    const actions = {login, validateLogin}
    const [state, dispatch] = useReducer(_authReducer, initialValue)    
    return (
        <authContext.Provider value={
            {...{'authState': state},  
             ...{'login': login(dispatch), 
                 'validateLogin': validateLogin(dispatch)}
             }}>
            {props.children}
        </authContext.Provider>
    )
}

//const temp = {Context: authContext, Provider: authProvider}

//export const {Context, Provider} = temp

const mapContext = MapDataContext(_authReducer, 'authState', {login}, initialValue)

export const {Context, Provider} = mapContext