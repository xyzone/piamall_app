import * as React  from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';  
import { Text, Button, Block, NavBar, Icon } from 'galio-framework'
import { SearchBar, ListItem, Header } from 'react-native-elements';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import  NavbarScreen  from '../NavbarScreen';
import { GetCategoryList, GetProductList } from '../../apis/PIAMallApi'


export default function CategoryScreen({ route, navigation }) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { keyId } = route.params
    const [ subcategoryList, setSubcategoryList ] = React.useState([])
    const [ productList, setProductList ] = React.useState([])
   
    async function getSubCategory(keyId){
      let category_list = await GetCategoryList(keyId)
      if (category_list.data.result){
        console.log(category_list.data.instances.data)
        setSubcategoryList(category_list.data.instances.data)
      } 
    }
    async function getProducts(category_id){
      let product_list = await GetProductList(category_id)
      if (product_list.data.result){ 
        setProductList(product_list.data.instances.data)
      } 
    }
 
    React.useEffect( () => {  
      validateLogin()
      getProducts(keyId)
      getSubCategory(keyId)

      
    }, []) 


    const renderProduct = ({ item }) => { 
      return (
        <TouchableOpacity
        onPress={() =>
            navigation.navigate('ProductScreen', { keyId: item.prd_id })
        }  >
      <ListItem
        title={item.product_name}
        subtitle={item.product_name}
        leftAvatar={{
         
          title: item.product_name
        }}
        bottomDivider
        chevron
      />
      </TouchableOpacity>
      )
    }
     

    return (
      <View  style={{flex: 1}}>  
            <Block>{NavbarScreen({navigation})}</Block>
            <Text>Category Product List token: {authState.authToken} {authState.is_login} {keyId}.</Text>
           { subcategoryList.map((category) => {
              return(
                <TouchableOpacity
                onPress={() =>
                    navigation.navigate('CategorySreen', { keyId: item.id })
                }  >
              <Text key={category.id}>{category.category_name}</Text>
              </TouchableOpacity>
              )
            }) 
          }
     
            {productList? 
              <FlatList keyExtractor={item => item.prd_id.toString()}  
              data={productList}  renderItem={renderProduct}  
              contentContainerStyle={{ flexGrow: 1}}  /> 
              :
              <Text>Loading ....</Text>
            }
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