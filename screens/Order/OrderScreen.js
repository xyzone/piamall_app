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
          title={`${item.status}`}
          subtitle={`Reward Points: ${item.total_points}\nordered @ ${item.entry_date}` } 
          leftAvatar={ 
            {title: item.id.toString()}
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
    <View style={styles.container} contentContainerStyle={styles.contentContainer}>
      {orderList?  
        <FlatList keyExtractor={item => item.id.toString()}  
              data={orderList.data}  renderItem={renderOrder}  
              ListHeaderComponent={
                <Text>{orderList.total_orders}</Text>
              }
              ListFooterComponent={
                <Button  
                    title="Go to Home"
                    containerStyle={{ flex: -1 }}
                    buttonStyle={styles.button} 
                    titleStyle={styles.textButton} 
                    onPress={() => {navigation.navigate('MainNavigator', {screen: 'MallNavi'})}}
                /> 
              }
              contentContainerStyle={{ flexGrow: 1}}  /> 
      :
        <Text>No any product found</Text>
      }   
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
