import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native';  
import { useFocusEffect } from '@react-navigation/native';

import {Button, List, Divider } from 'react-native-paper';
import { Text, ListItem } from 'react-native-elements';
import { Context as AuthContext } from '../../contexts/AuthContext'; 
 
import { GetOrderDetail } from '../../apis/PIAMallApi';

export default function OrderDetailScreen({navigation, route}) { 
    const { validateLogin } = useContext(AuthContext)
    const { token } = route.params 
    const [orderDetail, setOrderDetail] = React.useState(null)
    async function refreshOrderDetail(order_token){
      api_response = await GetOrderDetail(order_token)
      if(api_response.data.result){
        setOrderDetail(api_response.data.instances.data[0])
      }
  }
   
  useFocusEffect(
    React.useCallback(() => {
       refreshOrderDetail(token)
       
    }, [token, navigation])
  );

    useEffect( () => {  
      async function checkLogin(){
        await validateLogin()
      } 
      checkLogin() 
    }, []) 
     
    const renderCartProduct = ({ item }) => { 
      return (
        
          <ListItem
            key={item.scp_id}
            title={item.product.product_name}
            subtitle={`Price: \$${item.scp_price}  Reward Points: ${item.scp_reward_points}` } 
            leftAvatar={ 
              item.product.primary_image_url? {source: {uri:  item.product.primary_image_url  }} : {title: item.product.product_name}
             }
            bottomDivider
            chevron
          />
       
      )
    }

    return (
      
        <View style={styles.container}>   
        {orderDetail?
            <View>
            <FlatList keyExtractor={item => item.scp_id.toString()}  
              data={orderDetail.scps}  renderItem={renderCartProduct}  
              contentContainerStyle={{ flexGrow: 1}}  
              ListHeaderComponent = {
                <View>
                  <List.Item 
                    title="Order ID"
                    description={
                      
                      <Text numberOfLines={1}>
                      {orderDetail.id}  
                      </Text>
                      
                      }
                  /> 
                <List.Item 
                    title="Billing Name"
                    description={
                      
                      <Text numberOfLines={1}>
                      {orderDetail.billing_address.bill_name}  
                      </Text>
                      
                      }
                  /> 
                  <List.Item 
                    title="Billing Address"
                    description={
                      
                    <Text numberOfLines={2}>
                      {orderDetail.billing_address.bill_street} {orderDetail.billing_address.bill_street2},
                      {orderDetail.billing_address.bill_suburb}, {orderDetail.billing_address.bill_state} {orderDetail.billing_address.bill_postcode}
                    </Text> 
                    }
                  /> 
                <Divider />
                </View>
            }
            ListFooterComponent={
                <View>
                <Divider />
                <Button 
                  color="#4cb051" 
                  style={{marginRight:5}}
                  labelStyle={{ color: "white", fontSize: 13 }}
                  icon="arrow-right-bold-circle"  mode="contained" 
                  onPress={() => navigation.navigate('OrderScreen')} >
                  Back to Order List
                </Button>    
                </View>
            } 
            /> 
 
            </View>  
             :<Text>Processing</Text>
      }        
        </View>
       
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  