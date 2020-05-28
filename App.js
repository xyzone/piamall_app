import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, Button } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';   
import LoginNavigator from './navigation/LoginNavigator';
import MainNavigator from './navigation/MainNavigator';
import Main1Navigator from './navigation/Main1Navigator';
import useLinking from './navigation/useLinking';  
import { navigationRef } from './navigation/RootNavigation';
import { Provider as AuthProvider } from './contexts/AuthContext'; 
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState(); 
  const { getInitialState } = useLinking(navigationRef);
  
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);


 // <Stack.Screen name="Main" component={ BottomTabNavigator } />     
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
      <AuthProvider>
        <View style={styles.container} >
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}  
         <NavigationContainer ref={navigationRef} initialState={initialNavigationState}> 
            <Stack.Navigator screenOptions={{headerShown: false}}  >   
              <Stack.Screen name="LoginNavigator" component={ LoginNavigator } />
              <Stack.Screen name="MainNavigator" component={ MainNavigator } />   
              <Stack.Screen name="Main1Navigator" component={ Main1Navigator } />   
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </AuthProvider>
      </PaperProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
