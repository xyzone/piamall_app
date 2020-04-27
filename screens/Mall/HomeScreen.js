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
import theme from '../../constants/Themes';

export default function HomeScreen({navigation}) {
  const { validateLogin } = React.useContext(AuthContext)
  const [banners, setBanners] = React.useState([]) 
  const [featureProducts, setFeatureProducts] = React.useState([])
  const [keywords, setKeywords] = React.useState('')
  React.useEffect(() => {
    validateLogin()
    
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
    <ListItem
      title={item.category_name}
      subtitle={item.category_name}
      leftAvatar={{
        source: item.avatar_url && { uri: item.avatar_url },
        title: item.category_name
      }}
      bottomDivider
      chevron
    />)
  }

  const temp = () => {
    return (
      <View>
      <Header
        placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <View>
        < Text p muted >
                Hi, I'm a Galio component
        </ Text>
      </View> 
      <View>
            <SearchBar
              placeholder="Search Products ..."
              onChangeText={(val) => {setKeywords(val)}}
              value={keywords}
            
          />
        </View>
      <View  contentContainerStyle={styles.contentContainer}>
        

        <View> 
          <SliderBox images={banners}  
           autoplay circleLoop
           sliderBoxHeight={180}
           />

        </View>

        
        <View>
            <Text>Shop by Departments</Text>
            <FlatList
              keyExtractor={item => item.id}
              data={DemoCategories}
              renderItem={renderCategory}
            />
        </View>

        <View style={styles.helpContainer}>
           
          <Button  
                title="Go Shopping Now !"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('CategorySreen')}}
            /> 
        
        </View>


      </View>
      </View>
    )
  }

  return (
    <View >  
        <NavBar
          title="Confirmed Order"
          left={(
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Icon 
                name="menu"
                family="feather"
                size={theme.SIZES.BASE}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
         
      <View>
        <Text p muted >
                Hi, I'm a Galio component
        </Text>
      </View> 
      <View>
            <SearchBar
              placeholder="Search Products ..."
              onChangeText={(val) => {setKeywords(val)}}
              value={keywords}
            
          />
        </View>
     <SafeAreaView style={styles.safe_container}>  
      <ScrollView contentContainerStyle={styles.contentContainer}>

        <View> 
          <SliderBox images={banners}  
           autoplay circleLoop
           sliderBoxHeight={180}
           />

        </View>

        
        
            <Text>Shop by Departments</Text>
            <FlatList
              keyExtractor={item => item.id.toString()}
              data={DemoCategories}
              renderItem={renderCategory}
            />
        

        <View style={styles.helpContainer}>
           
          <Button  
                title="Go Shopping Now !"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('CategorySreen')}}
            /> 
        </View> 
      </ScrollView>
      </SafeAreaView>
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
