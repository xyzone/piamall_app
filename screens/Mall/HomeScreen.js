import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, View, Dimensions,FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import Image from 'react-native-scalable-image';
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box"; 
import { SearchBar, ListItem, Header } from 'react-native-elements';
import { Text, Button, Block, NavBar, Icon } from 'galio-framework'
import { Context as AuthContext } from '../../contexts/AuthContext';
import { DemoProudcts, DemoCategories } from '../../contexts/TestData';
import  NavbarScreen  from '../NavbarScreen';
import theme from '../../constants/Themes';
import { GetCategoryList } from '../../apis/PIAMallApi'

export default function HomeScreen({navigation}) {
  const { validateLogin } = React.useContext(AuthContext)
  const [banners, setBanners] = React.useState([]) 
  const [featureProducts, setFeatureProducts] = React.useState([])
  const [keywords, setKeywords] = React.useState('')
  const [ category, setCategory ] = React.useState([]) 

  async function getCategory(){
    let category_list = await GetCategoryList()
    if (category_list.data.result){
      setCategory(category_list.data.instances.data.filter((item) => {return item.parent_category_id == ""}))
    } 
  }


  React.useEffect(() => {
    validateLogin()
    
    
  }, []) 
  React.useEffect(() => {
    
    getCategory()
  }, [])
  React.useEffect(() => { 
    
    setBanners(
      [
        "https://www.cportal.com.au/static/shoppingcart/images/banner1.png",
        "https://www.cportal.com.au/static/shoppingcart/images/banner2.png",
        "https://www.cportal.com.au/static/shoppingcart/images/banner3.png"
      ]
    );
  }, [] ) 

  function searchKeyword(){


  }

  const renderCategory = ({ item }) => {
     
    return (
      <TouchableOpacity
      onPress={() =>
          navigation.navigate('CategorySreen', { keyId: item.id })
      }  >
    <ListItem
      title={item.category_name}
      subtitle={item.category_name}
      leftAvatar={{
        source: item.avatar_url && { uri: item.avatar_url },
        title: item.category_name
      }}
      bottomDivider
      chevron
    />
    </TouchableOpacity>
    )
  }
 
  return (
    <View  style={{flex: 1}}>  
          <Block>
            {NavbarScreen({navigation})}
          </Block>
            <SearchBar
              placeholder="Search Products ..."
              onChangeText={(val) => {setKeywords(val)}}
              value={keywords} 
          />
       
          <SliderBox images={banners}  
           autoplay circleLoop
           sliderBoxHeight={180}
           />

      
            <Text>Shop by Departments</Text>
            {category.length > 0 ?  
              <FlatList keyExtractor={item => item.id.toString()}  
              data={category}  renderItem={renderCategory}  
              contentContainerStyle={{ flexGrow: 1}}  /> 
            : 
              <Text>Processing.....</Text>  
            }
            <Block style={{justifyContent: 'center', alignItems:'center'}}>
              <Button round size="small" color="#50C7C7" onPress={()=>{getCategory()}}  >Refresh </Button>
              <Button round size="small" color="success"
                onPress={()=>{navigation.navigate('CategorySreen')}}  >Go Shopping Now </Button>
        
            </Block>    
        
            
      </View>
 
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
 

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
} 
const SCREEN_WIDTH = Dimensions.get('window').width; 

const styles = StyleSheet.create({
   
  safe_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    paddingVertical: 50
  },
  textButton: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,  
    //backgroundColor: 'rgba(232, 147, 142, 1)',
    borderRadius: 15,
    height: 30,
    width: 200,
  },

  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 50
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: SCREEN_WIDTH, 
    height: 150,
    resizeMode: 'contain',
    aspectRatio: 1, // <-- this
         
  },
  getStartedContainer: {
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: { 
    marginVertical: 7,
  },
  codeHighlightText: {
    fontSize: 13,
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: { 
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 3,
    paddingHorizontal: 4, 
  },
  getStartedText: {
    fontSize: 19,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabTopContainer: { 
     
    
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 10,
  },
  tabBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 12,
    color: '#2e78b7',
  },
});
