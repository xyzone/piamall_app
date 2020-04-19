import React, {createContext, useReducer} from 'react'
import {AsyncStorage} from 'react-native';
import MapDataContext from './mapDataContext';
import {navigateTo} from '../navigation/RootNavigation'; 
import PIAMallApi from '../apis/PIAMallApi';
import { config_form_data } from '../apis/ApiDataForm'
import md5 from 'md5';
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
            console.log('hi here')
            let form_data = new FormData();
            form_data.append('username', username)
            form_data.append('password', password)
            var api_response = await PIAMallApi.post('/api/api_login_check/', 
            form_data,  config_form_data)
            if (api_response.data.result){
                console.log('token', api_response.data.user_token, api_response.data)
                let token = api_response.data.user_token
                dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                await AsyncStorage.setItem('authToken', token)
                navigateTo('Main') 

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
            if (token != '')
            {
                console.log('before', token)
                dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                console.log('after', token)
                return token 
            }else{
                return ''
            }
            
        }
    )
}

const logout = (dispatch) => {
    return (
        async () => {
            await AsyncStorage.setItem('authToken', '');
            dispatch({type: 'logout'}) 
            navigateTo('Login')
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

export const {Context, Provider} = {Context: authContext, Provider: authProvider}
 
//const mapContext = MapDataContext(_authReducer, 'authState', 
//                                  {login, validateLogin, logout}, initialValue)
//export const {Context, Provider} = mapContext