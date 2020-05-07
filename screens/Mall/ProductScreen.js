import * as React  from 'react'
import { StyleSheet, View, Picker  } from 'react-native';  
import { Text, Button, Block } from 'galio-framework'; 
import { SliderBox } from 'react-native-image-slider-box'; 
import { Context as AuthContext  } from '../../contexts/AuthContext'; 
import  NavbarScreen  from '../NavbarScreen';
import { GetProductDetail } from '../../apis/PIAMallApi'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ProductScreen({ route, navigation }) { 
    const { authState, validateLogin } = React.useContext(AuthContext)
    const { keyId } = route.params 
    const [ product, setProduct ] = React.useState([])
    const [ productImages, setProductImages ] = React.useState([])
    const [selectedValue, setSelectedValue] = React.useState(0);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    async function getProduct(keyId){
      let product_detail = await GetProductDetail(keyId)
      if (product_detail.data.result){
        console.log(product_detail.data.instances.data)
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

    return (
      <View  style={{flex: 1}}>  
            <Block>{NavbarScreen({navigation})}</Block>
            <Text>Category Product List token: {authState.authToken} {authState.is_login} {keyId}.</Text>
            <Text> SKU: {product.sku}</Text>
            <Text> Name: {product.product_name}</Text>
            <Text>{product.primary_image_url}</Text>
            <View style={styles.container}>

              <View style={styles.column}>
                  {product.primary_image_url ?  
                  <SliderBox images={productImages}  
                      autoplay circleLoop  
                      sliderBoxHeight={180} 
                      resizeMethod={'resize'}
                      resizeMode={'contain'}
                  />
                  : null } 
              </View>
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