import * as React  from 'react'
import { StyleSheet, View, Picker, Dimensions, ScrollView  } from 'react-native';  
import {WebView} from 'react-native-webview';
import { Block } from 'galio-framework'; 
import { SliderBox } from 'react-native-image-slider-box'; 

import { Button, Divider, Text, List, Title, Subheading, Paragraph, Dialog, Portal } from 'react-native-paper';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import { NavBarScreen }  from '../NavbarScreen';
import { GetProductDetail, GetAddToCart} from '../../apis/PIAMallApi'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ProductScreen({ route, navigation }) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { keyId, parent_category, chosen_category } = route.params 
    const [ product, setProduct ] = React.useState([])
    const [ productImages, setProductImages ] = React.useState([]) 
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [apiAddToCart, setApiAddToCart] = React.useState({result: false, message: ''});
    const [showAddToCart, setShowAddToCart] = React.useState(false);
    const [purchaseQty, setPurchaseQty] = React.useState(0);
    const SCREEN_WIDTH = Dimensions.get('window').width;
    async function getProduct(keyId){
      let product_detail = await GetProductDetail(keyId)
      if (product_detail.data.result){  
        setProduct(product_detail.data.instances.data[0]) 
        setProductImages(
          product_detail.data.instances.data[0].image_urls
        );
      } 

    } 
    React.useEffect( () => {  
      async function checkLogin(){
        await validateLogin()
      } 
      checkLogin() 
      getProduct(keyId)      
    }, []) 

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    }; 

    async function addToCard(){
      let apiResponse = await GetAddToCart(product.prd_id, purchaseQty, product.sales_price, product.max_reward_point)
      console.log(apiResponse.data)
      setApiAddToCart(apiResponse.data)
      setShowAddToCart(true)
    }

    const hideAddToCart = () => {
      console.log('hide add to card')
      setShowAddToCart(false)
    }

    return (
       
        <View style={{flex: 1}}>  
            

            <Block>{NavBarScreen({navigation})}</Block> 
            {chosen_category?  
            <Button icon="arrow-left-thick" mode="contained" onPress={() => navigation.navigate('CategorySreen', 
                    { parent_category: parent_category,  param_chosen_category: chosen_category }) } >
                       Back to {chosen_category.category_name}
                       </Button> 
            :null} 
            
            <Title>{product.product_name}</Title>
            
            <ScrollView>
            <View >
                  {product.primary_image_url ?  
                  <SliderBox images={productImages}  
                      autoplay circleLoop  
                      sliderBoxHeight={200} 
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                  />
                  : null } 
              </View>
              <Divider />
            
              {product.sku ?
              <View>
                <View style={styles.container}>

                <View style={styles.column}>    
                  <Text> SKU: {product.sku}</Text>
                  <Text> Price: ${product.sales_price}</Text>
                  <Text> Reward Points: {product.max_reward_point}</Text>
                </View>     
                <View style={styles.space_between_columns}/>
                <View style={styles.column}>    

                <Picker selectedValue={purchaseQty}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setPurchaseQty(itemValue)}
                      >
                        <Picker.Item label="Qty" value="0" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                      </Picker>
                <Button color="#f08e25" 
                  labelStyle={{ color: "white", fontSize: 16 }}
                  icon="cart-plus"  mode="contained" onPress={ () => { addToCard()}}>Add to Cart</Button>
      
                </View>    
                </View>      
            
              <Divider />                 
                <WebView 
                  automaticallyAdjustContentInsets={false}             
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  decelerationRate="normal"
                  startInLoadingState={true}
                  scrollEnabled={false}
                  //scalesPageToFit={isAndroid ? false : true}
                  style={{height: 2000}}
                  originWhitelist={['*']}
                  source={{ html: `<div style="font-size:30pt">${product.detail}</div>` }}            
                />           
                </View>
              :<Text>Wait for processing .... </Text>}
            </ScrollView>     
            <Portal>              
                {apiAddToCart.result?
                <Dialog
                  visible={showAddToCart}
                  onDismiss = {() => {hideAddToCart()}} 
                >
                  <Dialog.Title style={{fontSize: 16}}> Added item to your shopping card </Dialog.Title>
                  <Dialog.Content>
                    <Paragraph>{product.product_name} x {purchaseQty}</Paragraph>
                  </Dialog.Content>
                  <Dialog.Actions style={{justifyContent:'space-evenly',}}>
                    <Button 
                    color="#4cb051" 
                    labelStyle={{ color: "white", fontSize: 12 }}
                  icon="cart-arrow-down"  mode="contained" 
                    
                    onPress={() => navigation.navigate('CategorySreen', 
                      { parent_category: parent_category,  param_chosen_category: chosen_category }) } >
                      Shopping </Button>

                    <Button 
                    color="#3471eb" 
                    labelStyle={{ color: "white", fontSize: 12 }}
                    icon="cart-arrow-right"  mode="contained" 
                    
                    onPress={() => {hideAddToCart(); 
                    navigation.navigate('ShoppingCartNavi', {screem: 'CartScreen'})}}>Checkout</Button>
                  </Dialog.Actions>
              </Dialog>
              : 
              <Dialog
                visible={showAddToCart}
                onDismiss = {() => {hideAddToCart()}} 
                > 
              <Dialog.Title style={{fontSize: 16}}> Warning: Failed to add to cart</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{product.product_name} x {purchaseQty}</Paragraph>               
                  <Paragraph>Error Message:  {apiAddToCart.message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions style={{justifyContent:'space-evenly',}}>
                
                  <Button 
                    color="#3471eb" 
                    labelStyle={{ color: "white", fontSize: 12 }}
                    icon="cart-arrow-right"  mode="contained" 
                    onPress={() => {hideAddToCart()}} >Go Back</Button>
                </Dialog.Actions>
              </Dialog>
              }
              
            </Portal>
             
        </View>
    )
}


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
   // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  column: {
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'flex-start',
    height:100, 
  },
  space_between_columns:{
    width:25
  },
  box: {
    height:50,
    width:50
  }
});