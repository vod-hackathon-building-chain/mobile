import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/homeScreen';
import SearchScreen from '../screens/searchScreen';
import NotificationScreen from '../screens/notificationScreen';
import SignUpScreen from '../screens/signupScreen';
import BuildingScreen from '../screens/buildingScreen';
import LoginScreen from '../screens/loginScreen';
import ContractScreen from '../screens/contractScreen';
import AddBuilding from '../screens/addBuilding';

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
            ? `ios-home`
            : 'md-home'
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

const AddBuildingStack = createStackNavigator({
    Settings: AddBuilding
})

AddBuildingStack.navigationOptions = {
    tabBarLabel: 'Add Building',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
        />
    ),
};

NotificationStack.navigationOptions = {
    header: null,
    tabBarLabel: 'Notification',
    headerLeft: null,
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    NotificationStack,
    SearchStack,
});

export const AppNavigator = createStackNavigator({
    Login: { screen: LoginScreen, header: null },
    SignUp: { screen: SignUpScreen, header: null},
    Home: { screen: createBottomTabNavigator({
            HomeStack,
            NotificationStack,
            SearchStack,
        }),
    },
    Building: {screen: BuildingScreen, header: null},
    Contract: {screen: ContractScreen},
    AddBuilding: {screen: AddBuildingStack}
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
