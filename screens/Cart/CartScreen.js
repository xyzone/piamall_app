import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { SearchBar, ListItem, Header } from 'react-native-elements';
import { Text, Button, Block, NavBar, Icon } from 'galio-framework'
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { Context as AuthContext } from '../../contexts/AuthContext'
import theme from '../../constants/Themes';

export default function LinksScreen({navigation}) {
  const {authState, validateLogin} = React.useContext(AuthContext)
  React.useEffect(() =>{
    console.log('Hit Links Screen')
    validateLogin()
  }, [])

  return (
    <View>
    <Block>
          <NavBar
            title="Shopping Cart"
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
            right= {(
              <TouchableOpacity onPress={() => navigation.navigate('Shopping Cart')}>
              <Icon 
                name="shopping-cart"
                family="feather"
                size={theme.SIZES.BASE}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
            )} 
            style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
          /> 
       </Block>
   
       <Button  
                 
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>{navigation.navigate('CheckoutScreen')}}
      >CheckoutScreen</Button>
      <OptionButton
        icon="md-school"
        label="Read the Expo documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}
      />
      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}
      />
      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
        isLastOption
      />
   
    </View>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
