import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Submit new Contract',
    };

    render() {
        return <ExpoConfigView />;
    }
}
