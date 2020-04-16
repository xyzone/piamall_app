import {AsyncStorage} from 'react-native';
import MapDataContext from './mapDataContext';
import {navigateTo} from '../navigation/RootNavigation'; 
import md5 from 'md5';
const initialValue = {
    is_login: false,
    authToken: '',
    loginMessage: ''
}

const _authReducer = (state, action) => {
    console.log(action.payload.is_login)
    switch (action.type) {
        case 'login':
            return {...state, loginMessage: '', is_login: action.payload.is_login, 
                    authToken: action.payload.authToken}
            break;
        case 'show_message':
            return {...state, loginMessage: action.payload, authToken: ''}        
        default:
            break;
    }
} 

const login = (dispatch) => {
    return(
        async(username, password, navigation) => { 

            if(username == 'richard'){
                let token = 'token-12345'
                dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                await AsyncStorage.setItem('authToken', token)
                navigateTo('Main')
                //navigation.navigate('Main') 
            }else{
                dispatch({
                    type: 'show_message', 
                    payload: ' Failed to login, Email and password is not correct.'})
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
            await AsyncStorage.setItem('authToken', '') 
            navigateTo('Login')
        }
    )
}

const mapContext = MapDataContext(_authReducer, 'authState', {login, validateLogin, logout}, initialValue)

export const {Context, Provider} = mapContext