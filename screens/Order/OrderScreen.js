import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { SearchBar, ListItem, Header } from 'react-native-elements';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { GetOrderList } from '../../apis/PIAMallApi';
import { Context as AuthContext } from '../../contexts/AuthContext';
export default function OrderScreen({navigation}) {
  
  const {validateLogin} = React.useContext(AuthContext)
  const [orderList, setOrderList] = React.useState([])

  async function refreshOrderList(){
      api_response = await GetOrderList()
      if(api_response.data.result){
        setOrderList(api_response.data.instances)
      }
  }

  const renderOrder = ({ item }) => { 
    return (
      <TouchableOpacity key={item.id}
      onPress={() =>
          navigation.navigate('OrderNavigator', {screen: 'OrderDetailScreen', 
          params: { token: item.token }})
          }  >
        <ListItem
          key={item.id.toString()}
          title={item.id.toString()}
          subtitle={`Reward Points: ${item.total_points}, Status: ${item.status}` } 
          leftAvatar={ 
            item.status? {source: {uri:  item.status  }} : {title: item.status}
           }
          bottomDivider
          chevron
        />
    </TouchableOpacity>
    )
  }
  
  React.useEffect(() =>{  
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action 
      refreshOrderList()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation])
  
  React.useEffect(() => { 
    async function checkLogin(){
      await validateLogin()
    } 
    checkLogin() 
  }, [])
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text>{orderList.total_orders}</Text>
      {orderList? 
              <FlatList keyExtractor={item => item.id.toString()}  
              data={orderList.data}  renderItem={renderOrder}  
              contentContainerStyle={{ flexGrow: 1}}  /> 
              :
              <Text>No any product found</Text>
            } 
      
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

      <Button  
                title="Order Detail"
                containerStyle={{ flex: -1 }}
                buttonStyle={styles.button} 
                titleStyle={styles.textButton} 
                onPress={()=>refreshOrderList()}
            /> 
          
    </ScrollView>
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
