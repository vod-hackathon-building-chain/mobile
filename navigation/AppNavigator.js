import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {AppNavigator} from './../navigation/MainTabNavigator'
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: AppNavigator,
});