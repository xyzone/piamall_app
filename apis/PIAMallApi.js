import axios from 'axios'; 
import {NetworkInfo} from 'react-native-network-info';
import {AsyncStorage} from 'react-native';  
import {navigateTo} from '../navigation/RootNavigation';  
import { config_form_data } from '../apis/ApiDataForm'
import { capPostData, capPostDataNoEncry } from '../components/GeneralFunctions'
 
 
const homeAPI = () => {
     
    return (axios.create({ 
    //baseURL: 'http://192.168.43.56:7150/en/'
    //baseURL: 'http://192.168.30.52:7150/en/'
    baseURL: 'http://192.168.1.115:7150/en/'   
 }))
}

export const PIAMallApi = homeAPI()


export async function AuthClientApi(username, password){
    let form_data = capPostData(
        {username, password}
    ) 
    let api_response = await PIAMallApi.post('/api/api_login/', 
    form_data,  config_form_data)
    return api_response

}

export async function ValidateClientApi(token){
    let form_data = capPostData(
        {user_token: token}                ) 
    let api_response = await PIAMallApi.post('/api/api_login_check/', form_data, config_form_data)
     
    return api_response
}

export async function LogoutClientApi(token){
    let form_data = capPostData(
        {user_token: token}                ) 
    let api_response = await PIAMallApi.post('/api/api_logout/', form_data, config_form_data)
    return api_response
}

export async function GetCategoryList(idcategory=0){
    let token = await AsyncStorage.getItem('authToken')
    let api_response = await PIAMallApi.get('/api/api_category_list/', 
    {params: {all: true, user_token: token, parent_category_id: idcategory}})
    return api_response
}
 
export async function GetProductList(idcategory=0){
    let token = await AsyncStorage.getItem('authToken')
    let api_response = await PIAMallApi.get('/api/api_product_list/', 
    {params: {all: true, user_token: token, category_id: idcategory}})
    return api_response
} 
 
export async function GetProductDetail(idproduct){
    let token = await AsyncStorage.getItem('authToken')
    let get_data = {all: true, user_token: token, ids:"[" + idproduct.toString() + "]", test: [1,2,3].toString()}
    let api_response = await PIAMallApi.get('/api/api_product_detail/',  {params: get_data})
    return api_response
}

export async function AddToCartApi(product_id, qty, unit_price, unit_reward_point){
     
    let form_data = capPostDataNoEncry({product_id, qty, unit_price, unit_reward_point})
    let api_response = await PIAMallApi.post('/api/api_add_to_cart/',  form_data, config_form_data)
     
    return api_response
}

export async function GetShoppingCart(){ 
    let api_response = await PIAMallApi.get('/api/api_shopping_cart/', {params: {all: true}})
    return api_response
}

export async function ValidateCheckout(){
    let api_response = await PIAMallApi.post('/api/api_checkout/',  {}, config_form_data)
    return api_response
    
}

export async function ProcessCheckout(payment_type){
     
    let form_data = capPostDataNoEncry({payment_type})
    let api_response = await PIAMallApi.post('/api/api_checkout_payment/',  form_data, config_form_data)
    return api_response
}


export async function GetOrderList(){
    let token = await AsyncStorage.getItem('authToken')
    let get_data = {all: true, user_token: token}
    let api_response = await PIAMallApi.get('/api/api_order_list/',  {params: get_data}) 
    return api_response
}

export async function GetOrderDetail(order_token){
    let token = await AsyncStorage.getItem('authToken')
    let get_data = {all: true, user_token: token, order_token}
    let api_response = await PIAMallApi.get('/api/api_order_detail/',  {params: get_data})
    console.log(api_response)
    return api_response
}
