import * as React  from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';  
import { Block, NavBar, Icon } from 'galio-framework'
import { Button, Divider, Text, List } from 'react-native-paper';
import { SearchBar, ListItem, Header } from 'react-native-elements';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import {NavBarScreen, NavbarCategoryScreen}  from '../NavbarScreen';
import { GetCategoryList, GetProductList } from '../../apis/PIAMallApi'



export default function CategoryScreen({ route, navigation }) {  
  
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { param_chosen_category, parent_category } = route.params 
    const [ chosenCategory, setChosenCategory ] = React.useState('')
    const [ subcategoryList, setSubcategoryList ] = React.useState([])
    const [ productList, setProductList ] = React.useState([]) 
    const [ categoryExpand, setCategoryExpand ] = React.useState(false) 


    async function getSubCategory(category_id){
      let category_list = await GetCategoryList(category_id)
      if (category_list.data.result){ 
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
    const isFocused = navigation.isFocused();
 
    React.useEffect(() => {
      if (isFocused) { 
        console.log('is focused')
      }
    },[isFocused]);

    React.useEffect( () => {    
      validateLogin() 
      refreshPage(param_chosen_category)
    }, [param_chosen_category]) 
    
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
            navigation.navigate('ProductScreen', { keyId: item.prd_id, chosen_category: param_chosen_category, parent_category: parent_category })
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
      <View  style={styles.container}>  
            <Block>{ NavbarCategoryScreen({ navigation, route })}</Block> 
            {parent_category ? 
            
            <Button icon="arrow-left-thick" mode="contained" onPress={() => navigation.navigate('CategorySreen',  { parent_category: null,  param_chosen_category: parent_category }) }>
              Back to {parent_category.category_name}
             </Button> 
        :  
            <Button icon="arrow-left-thick" mode="contained"    onPress={() => navigation.navigate('HomeScreen')}>
              Back to Home
             </Button>  
        }    
            <Divider />
            <View  >

            {subcategoryList?    
            <List.Accordion
              title={chosenCategory.category_name}
              left={props => <List.Icon {...props} icon="bell" />}
              expanded={categoryExpand} 
              onPress={() => {setCategoryExpand(!categoryExpand)}}
            > 
            {subcategoryList?          
               subcategoryList.map((item) => {
                return( 
                  <List.Item  key={item.id.toString()} 
                    title={item.category_name}
                    left={props => <List.Icon {...props} icon="arrow-right-bold-circle" />}
                    onPress={() => navigation.navigate('CategorySreen', 
                    { parent_category: param_chosen_category,  param_chosen_category: item }) } /> 
                 
                )
              }) 
              : null   
            }
             
              </List.Accordion>
            : null}

          </View> 
            {productList? 
              <FlatList keyExtractor={item => item.prd_id.toString()}  
              data={productList}  renderItem={renderProduct}  
              contentContainerStyle={{ flexGrow: 1}}  /> 
              :
              <Text>No any product found</Text>
            } 
        </View>
    )
}


  const styles = StyleSheet.create({ 
    container: {
      flex: 1,
    },
    categoryNaviContainer: { 
      flexDirection:'column',
      justifyContent: 'flex-start', 
      //backgroundColor: '#00FCFF', 
      alignItems:'flex-start', 
    },
    categoryColumn: {
       flexDirection:'column',
      justifyContent:'flex-start',
      alignItems:'flex-start', 
      
    },
       
  });  
