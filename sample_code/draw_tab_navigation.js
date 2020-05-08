import React from 'react';
import { Text, View,Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 6.2.2
import { createBottomTabNavigator, createAppContainer, createStackNavigator,createDrawerNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class HomeScreen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home1!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

class SettingsScreen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings1!</Text>
      </View>
    );
  }
}

class TestScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Test!</Text>
      </View>
    );
  }
}

class TestScreen1 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Test1!</Text>
      </View>
    );
  }
}


//drawer items

class Screen2 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen2 To Add in Drawer!</Text>
      </View>
    );
  }
}

class Screen3 extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Screen3 To Add in Drawer!</Text>
      </View>
    );
  }
}


//drawer Menu
class DrawerMenu extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Drawer Item</Text>
       <Button
          title="SCREEN 2"
          onPress={() => this.props.navigation.navigate('Screen2')}
        />
         <Button
          title="SCREEN 3"
          onPress={() => this.props.navigation.navigate('Screen3')}
        />
      </View>
    );
  }
}

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              // /If you're using react-native < 0.57 overflow outside of the parent
              // will not work on Android, see https://git.io/fhLJ8
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  iconName = `ios-information-circle${focused ? '' : '-outline'}`;
  // We want to add badges to home tab icon
  IconComponent = HomeIconWithBadge;
 

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

const HomeStack = createStackNavigator({
  HomeScreen: HomeScreen,
  HomeScreen1: HomeScreen1
});


const SettingsStack = createStackNavigator({
  SettingsScreen: SettingsScreen,
  SettingsScreen1: SettingsScreen1,
});

const TestStack = createStackNavigator({
  TestScreen: TestScreen,
  TestScreen1: TestScreen1
});

const Tab = createBottomTabNavigator({
  HomeStack,
  SettingsStack,
  TestStack,
},
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  );

 const Drawer = createDrawerNavigator({
  Drawer: Tab
},{
  initialRouteName: 'Drawer',
  contentComponent: DrawerMenu,
  drawerWidth: 200
}
);

//drawer stack navigation
const PrimaryNav = createStackNavigator({
  HomeScreen: { screen: Drawer },
  Screen2: { screen: Screen2 },
  Screen3: { screen: Screen3 }
},{
  // Default config for all screens
  headerMode: 'none'
});


export default createAppContainer(PrimaryNav);

// export default createAppContainer(
//   createBottomTabNavigator(
//     {
//       HomeStack,
//       SettingsStack,
//       TestStack
//     },
//     {
//       defaultNavigationOptions: ({ navigation }) => ({
//         tabBarIcon: ({ focused, tintColor }) =>
//           getTabBarIcon(navigation, focused, tintColor),
//       }),
//       tabBarOptions: {
//         activeTintColor: 'tomato',
//         inactiveTintColor: 'gray',
//       },
//     }
//   )
// );
