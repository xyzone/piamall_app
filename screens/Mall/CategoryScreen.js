import * as React  from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';  
import { Text, Button, Block, NavBar, Icon } from 'galio-framework'
import { SearchBar, ListItem, Header } from 'react-native-elements';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import  NavbarScreen  from '../NavbarScreen';
import { GetCategoryList, GetProductList } from '../../apis/PIAMallApi'


export default function CategoryScreen({ route, navigation }) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { param_chosen_category } = route.params
    const [ chosenCategory, setChosenCategory ] = React.useState('')
    const [ subcategoryList, setSubcategoryList ] = React.useState([])
    const [ productList, setProductList ] = React.useState([])

    console.log('chosen category', param_chosen_category)
    async function getSubCategory(category_id){
      let category_list = await GetCategoryList(category_id)
      if (category_list.data.result){
        console.log('category list', category_list.data.instances.data)
        setSubcategoryList(category_list.data.instances.data)
      } 
      else{
        setSubcategoryList([])
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
      console.log('param_chosen_category', param_chosen_category)
      refreshPage(param_chosen_category)

      
    }, []) 

    async function refreshPage(category)
    {
      if (category){
        setChosenCategory(category)
        await getProducts(category.id)
        await getSubCategory(category.id)      
      }
      
    }

    const renderProduct = ({ item }) => { 
      return (
        <TouchableOpacity key={item.prd_id}
        onPress={() =>
            navigation.navigate('ProductScreen', { keyId: item.prd_id })
        }  >
      <ListItem
        key={item.prouduct_id}
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
            <Text>Category Product List token: {authState.authToken} {authState.is_login} </Text>
            <Text> Chosen Category{chosenCategory.category_name}.</Text>
            {subcategoryList? <Text>Sub Categories</Text> : null}
            {subcategoryList?
               
               subcategoryList.map((item) => {
                return(
                  <TouchableOpacity  key={item.id}  onPress={() => refreshPage(item) }  >
                    <Text key={item.id}>{item.category_name}</Text>
                </TouchableOpacity>
                )
              }) 
              : null   
            }
           
     
            {productList? 
              <FlatList keyExtractor={item => item.prd_id.toString()}  
              data={productList}  renderItem={renderProduct}  
              contentContainerStyle={{ flexGrow: 1}}  /> 
              :
              <Text>Loading ....</Text>
            }
          
            { authState.is_login? <Text>Login</Text>: <Text>NO</Text>}
   
        </View>
    )
}


  const styles = StyleSheet.create({
    
    
    container: {
      flex: 1,
    },

 
  });  