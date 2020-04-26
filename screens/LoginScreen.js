import * as React from 'react'
import { StyleSheet, View, Dimensions, KeyboardAvoidingView } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';
import { Text,  Button} from 'galio-framework'
import { Context as AuthContext } from '../contexts/AuthContext'; 
const SCREEN_WIDTH = Dimensions.get('window').width;
 
export default function LoginScreen({navigation}) {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('') 
    const { authState, login } = React.useContext(AuthContext)
    const [banners, setBanners] = React.useState([])
    
    React.useEffect(() => {
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
              <View> 
                      <SliderBox images={banners}  
                      autoplay circleLoop
                      sliderBoxHeight={180}
                      />
                    </View>

            <KeyboardAvoidingView
              contentContainerStyle={styles.loginContainer}
              behavior="position">
                  
                {authState.authToken? <Text> Wait for processing ... </Text> : null}
                <View style={styles.formContainer}>
                    <Input
                        leftIcon={
                            <Icon
                                name="envelope-o"
                                type="font-awesome"
                                color="rgba(0, 0, 0, 0.38)"
                                size={25}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        } 
                        keyboardAppearance="light"
                        autoFocus={false}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        returnKeyType="next"
                        inputStyle={{ marginLeft: 8 }}
                        placeholder={'Email'}
                        containerStyle={{
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}                                     
                        onChangeText = { (text) => {setUsername(text)}}
                    />
                    <Input 
                        leftIcon={ 
                            <Icon
                                name="lock"
                                type="simple-line-icon"
                                color="rgba(0, 0, 0, 0.38)"
                                size={30}
                                style={{ backgroundColor: 'transparent' }}
                            />
                        } 
                        keyboardAppearance="light"
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true} 
                        blurOnSubmit={true}
                        containerStyle={{
                            marginTop: 16,
                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                        }}
                        inputStyle={{ marginLeft: 13 }}
                        placeholder={'Password'}
                        onChangeText = { (text) => {setPassword(text)}}
                    />

                    <Button  
                      style={styles.button}
                      round uppercase 
                      color="info"
                      title="Login PIA Mall"
                      containerStyle={{ flex: -1 }}
                      buttonStyle={styles.loginButton} 
                      titleStyle={styles.loginTextButton} 
                      onPress={()=>{login(username, password)}}
                    > Login PIA Mall </Button>

                </View>    
                {authState.loginMessage? <Text style={styles.errorMessage}>{authState.loginMessage}</Text>: null}
              

            </KeyboardAvoidingView>  

            <ScrollView   contentContainerStyle={styles.contentContainer}>
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
                      
                      Our points+cash system allows you to check out simply and securely and track your points balance. Remember, the more properties you have, the more points you can earn with PIA and the more you can save.
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
                      
                      Our points+cash system allows you to check out simply and securely and track your points balance. Remember, the more properties you have, the more points you can earn with PIA and the more you can save.
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
                      
                      Our points+cash system allows you to check out simply and securely and track your points balance. Remember, the more properties you have, the more points you can earn with PIA and the more you can save.
                      </Text>
                  </View>
        
                </View>
  
                </ScrollView>
        </View>

        
        
    )
}
  
  const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    
    container: {
      marginTop: 25,
      flex: 1,
    },
    button: {
      marginTop: 10,
    },
 
    loginContainer: {
        marginTop: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTextButton: {
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    loginButton: {
      marginTop: 10,  
      //backgroundColor: 'rgba(232, 147, 142, 1)',
      borderRadius: 15,
      height: 50,
      width: 200,
    },
    titleContainer: {
      height: 150,
      backgroundColor: 'transparent',
      justifyContent: 'center',
    },
    formContainer: {
      backgroundColor: 'white',
      width: SCREEN_WIDTH ,
      borderRadius: 10,
      paddingTop: 32,
      paddingBottom: 32,
      alignItems: 'center',
    },
    loginText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
    },
    
    titleText: {
      color: 'white',
      fontSize: 30,
      fontFamily: 'regular',
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
