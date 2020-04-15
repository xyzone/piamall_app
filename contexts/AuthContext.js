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
                let token = 'token-12345'
                dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                await AsyncStorage.setItem('authToken', token)
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
            const token = AsyncStorage.getItem('authToken')
            if (token != '')
            {
                console.log(token)
                //dispatch({type: 'login', payload: {is_login: true, authToken: token}})
                
            }else{
                 
            }
            
        }
    )
}


const mapContext = MapDataContext(_authReducer, 'authState', {login, validateLogin}, initialValue)

export const {Context, Provider} = mapContext