import * as React  from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';  
import { Text, Button, Block, NavBar, Icon } from 'galio-framework'
import { SearchBar, ListItem, Header } from 'react-native-elements';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import  NavbarScreen  from '../NavbarScreen';
import { GetCategoryList, GetProductDetail } from '../../apis/PIAMallApi'


export default function ProductScreen({ route, navigation }) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { keyId } = route.params 
    const [ product, setProduct ] = React.useState([])

    async function getProduct(keyId){
      let product_detail = await GetProductDetail(keyId)
      if (product_detail.data.result){
        console.log(product_detail.data.instances.data)
        setProduct(product_detail.data.instances.data[0])
      } 
    }
   
    React.useEffect( () => {  
      validateLogin()
      getProduct(keyId)
      
    }, []) 

 
    return (
      <View  style={{flex: 1}}>  
            <Block>{NavbarScreen({navigation})}</Block>
            <Text>Category Product List token: {authState.authToken} {authState.is_login} {keyId}.</Text>

            <Text> SKU: {product.sku}</Text>
            <Button                  
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('ProductScreen')}}
            > Check Product!</Button>
            { authState.is_login? <Text>Login</Text>: <Text>NO</Text>}
   
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  