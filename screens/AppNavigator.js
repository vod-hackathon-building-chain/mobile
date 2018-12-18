import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {AppNavigator} from './MainTabNavigator'

export default createSwitchNavigator({
    Main: AppNavigator,
});