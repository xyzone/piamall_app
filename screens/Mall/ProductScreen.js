import * as React  from 'react'
import { StyleSheet, View, Picker, Dimensions, ScrollView  } from 'react-native';  
import {WebView} from 'react-native-webview';
import { Block } from 'galio-framework'; 
import { SliderBox } from 'react-native-image-slider-box'; 

import { Button, Divider, Text, List, Title, Subheading, Paragraph } from 'react-native-paper';
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import { NavBarScreen }  from '../NavbarScreen';
import { GetProductDetail } from '../../apis/PIAMallApi'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ProductScreen({ route, navigation }) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { keyId, parent_category, chosen_category } = route.params 
    const [ product, setProduct ] = React.useState([])
    const [ productImages, setProductImages ] = React.useState([])
    const [selectedValue, setSelectedValue] = React.useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

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
    return (
       <View  style={{flex: 1}}>  
            <Block>{NavBarScreen({navigation})}</Block> 
            {chosen_category?  
            <Button icon="arrow-left-thick" mode="contained" onPress={() => navigation.navigate('CategorySreen', 
                    { parent_category: parent_category,  param_chosen_category: chosen_category }) } > Back to {chosen_category.category_name}</Button> 
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
            
              <View style={styles.container}>
            <View style={styles.column}>    
            <Subheading> SKU: {product.sku}</Subheading>
  
            </View>              


         
            <View style={styles.space_between_columns}/>
            <View style={styles.column}>    
            <Subheading> SKU: {product.sku}</Subheading>
  
            </View>    
            </View>                       
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
            </ScrollView>         
            
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
    justifyContent:'space-between',
    alignItems:'center',
    height:100, 
  },
  space_between_columns:{
    width:10
  },
  box: {
    height:50,
    width:50
  }
});