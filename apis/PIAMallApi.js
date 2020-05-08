import axios from 'axios';
import React, {createContext, useReducer} from 'react'
import {AsyncStorage} from 'react-native';  
import {navigateTo} from '../navigation/RootNavigation';  
import { config_form_data } from '../apis/ApiDataForm'
import { capPostData } from '../components/GeneralFunctions'


export const PIAMallApi = axios.create({
    //baseURL: 'http://192.168.46.129:7150/en/'
    baseURL: 'http://172.17.0.1:7150/en/'
})


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
    {params: {all: true, user_token: token, idcategory}})
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
    let api_response = await PIAMallApi.get('/api/api_product_detail/', 
    {params: get_data})
    console.log(api_response)
    return api_response
}