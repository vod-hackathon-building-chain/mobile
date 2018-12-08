import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={
            Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
        />
    ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

SearchStack.navigationOptions = {
    tabBarLabel: 'Search',
    header: null,
    title: 'Search',
    headerLeft: null,
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
        />
    ),
};

const NotificationStack = createStackNavigator({
  Settings: NotificationScreen,
});

NotificationStack.navigationOptions = {
    header: null,
    tabBarLabel: 'Notification',
    headerLeft: null,
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    NotificationStack,
    SearchStack,
});

export const AppNavigator = StackNavigator({
    Login: { screen: LoginScreen, header: null },
    SignUp: { screen: SignUpScreen, header: null},
    Home: { screen: createBottomTabNavigator({
            HomeStack,
            NotificationStack,
            SearchStack,
        }),
    }
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
