import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './TabBarIcon';
import HomeScreen from './homeScreen';
import SearchScreen from './searchScreen';
import NotificationScreen from './notificationScreen';
import SignUpScreen from './signupScreen';
import BuildingScreen from './buildingScreen';
import LoginScreen from './loginScreen';
import ContractScreen from './contractScreen';
import AddBuilding from './addBuilding';

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

const BuildingStack = createStackNavigator({
    Settings: BuildingScreen
})

const ContractScreenStack = createStackNavigator({
    Settings: ContractScreen
})

ContractScreenStack.navigationOptions = {
    tabBarLabel: 'Contract',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
        />
    ),
};

BuildingStack.navigationOptions = {
    tabBarLabel: 'Building',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-filing' : 'md-filing'}
        />
    ),
};

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
    Building: {screen: BuildingStack, header: null},
    Contract: {screen: ContractScreenStack},
    AddBuilding: {screen: AddBuildingStack}
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 });
