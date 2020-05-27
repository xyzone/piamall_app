import * as React  from 'react'
import { StyleSheet, View, Picker  } from 'react-native';  
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
      validateLogin()
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
    console.log(product)
    return (
      <View  style={{flex: 1}}>  
            <Block>{NavBarScreen({navigation})}</Block> 
            {chosen_category?  
            <Button icon="arrow-left-thick" mode="contained" onPress={() => navigation.navigate('CategorySreen', 
                    { parent_category: parent_category,  param_chosen_category: chosen_category }) } > Back to {chosen_category.category_name}</Button> 
            :null} 
            
            <Title>{product.product_name}</Title>
            <Subheading> SKU: {product.sku}</Subheading>
            
            <View >
                  {product.primary_image_url ?  
                  <SliderBox images={productImages}  
                      autoplay circleLoop  
                      sliderBoxHeight={180} 
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                  />
                  : null } 
              </View>
            <View style={styles.container}>



            <Paragraph>{product.detail}</Paragraph> 
            <View style={styles.space_between_columns}/>
            <View style={styles.column}>    
                    
                  <Picker selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                  </Picker>



                  <View>
                  <Button onPress={showDatePicker}>Show Date Picker</Button>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                </View>    


                <Button                  
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('ProductScreen')}}  > Check Product!
                </Button>
              </View>    
            </View>
            
           
            { authState.is_login? <Text>Login</Text>: <Text>NO</Text>}
   
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
    height:200,
    width:150
  },
  space_between_columns:{
    width:100
  },
  box: {
    height:50,
    width:50
  }
});