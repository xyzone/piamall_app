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


const mapContext = MapDataContext(_authReducer, 'authState', {login}, initialValue)

export const {Context, Provider} = mapContext