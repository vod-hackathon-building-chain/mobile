import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import {AppNavigator} from 'BrokerMobile/screens/MainTabNavigator'

export default createSwitchNavigator({
    Main: AppNavigator,
});