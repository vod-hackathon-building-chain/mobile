import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {AppNavigator} from './../navigation/MainTabNavigator'
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
    Main: AppNavigator,
});