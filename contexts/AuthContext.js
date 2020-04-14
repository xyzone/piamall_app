import {AsyncStorage} from 'react-native';
import MapDataContext from './mapDataContext';
import {navigateTo} from '../navigation/Navigator'; 
import md5 from 'md5';
const initialValue = {
    authToken: null,
    loginMessage: ''
}

const validateLogin = (dispatch) => {
    return (
        async () => {
            navigateTo('Signin')
        }
    )
}
