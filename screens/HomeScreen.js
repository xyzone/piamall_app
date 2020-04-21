import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet,  TouchableOpacity, View, Dimensions, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";

import Image from 'react-native-scalable-image';
import { MonoText } from '../components/StyledText';
import { Button, ThemeProvider, Text } from 'react-native-elements';

import {Context as AuthContext} from '../contexts/AuthContext'

export default function HomeScreen({navigation}) {
  const { authState, login, validateLogin } = React.useContext(AuthContext)
  const [banners, setBanners] = React.useState([])

  React.useEffect(() => {
    validateLogin()
    setBanners(
      [
        "https://www.cportal.com.au/static/shoppingcart/images/banner1.png",
        "https://www.cportal.com.au/static/shoppingcart/images/banner2.png",
        "https://www.cportal.com.au/static/shoppingcart/images/banner3.png"
      ]
    )
  }, []) 

  return (
    <View style={styles.container}>

      <View style={styles.tabTopContainer}>
        <Text style={styles.tabBarInfoText}>PIA Mall Home</Text>       
      </View>

      <ScrollView   contentContainerStyle={styles.contentContainer}>
        <View> 
          <SliderBox images={banners}  
           autoplay circleLoop
           sliderBoxHeight={180}
           />
        </View>

        <View style={styles.getStartedContainer}>
          
        <Text style={styles.getStartedText}>Earn loyalty points just by
being a loyal customer</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text style={styles.codeHighlightText}>
              Discover exclusive offers that we have selected for you from our participating partners. 
               
              Use your points to purchase vouchers, gift cards, services and lifestyle offers to save at your favourite retailers.
              </Text>
          </View>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text style={styles.codeHighlightText}>   
              
              Our 'points+cash' system allows you to check out simply and securely and track your points balance. Remember, the more properties you have, the more points you can earn with PIA and the more you can save.
              </Text>
          </View>

          <Text style={styles.getStartedText}>Earn loyalty points just by
being a loyal customer</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text style={styles.codeHighlightText}>
              Discover exclusive offers that we have selected for you from our participating partners. 
               
              Use your points to purchase vouchers, gift cards, services and lifestyle offers to save at your favourite retailers.
              </Text>
          </View>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text style={styles.codeHighlightText}>   
              
              Our 'points+cash' system allows you to check out simply and securely and track your points balance. Remember, the more properties you have, the more points you can earn with PIA and the more you can save.
              </Text>
          </View>


          <Text style={styles.getStartedText}>Earn loyalty points just by
being a loyal customer</Text>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text style={styles.codeHighlightText}>
              Discover exclusive offers that we have selected for you from our participating partners. 
               
              Use your points to purchase vouchers, gift cards, services and lifestyle offers to save at your favourite retailers.
              </Text>
          </View>

          <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
            <Text style={styles.codeHighlightText}>   
              
              Our 'points+cash' system allows you to check out simply and securely and track your points balance. Remember, the more properties you have, the more points you can earn with PIA and the more you can save.
              </Text>
          </View>

        </View>

        <View style={styles.helpContainer}>
           
          <Button  
                title="Go Shopping Now !"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('ShoppingCart')}}
            /> 
        
        </View>


      </ScrollView>

     
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
const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({

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
