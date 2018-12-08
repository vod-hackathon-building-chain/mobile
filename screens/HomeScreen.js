import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { CheckBox } from 'react-native-elements'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Home',
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true };
    }

    renderBuilding = () => {
        if (this.state.buildingChecked)
            return (                
                <View style={styles.welcomeContainer}>
                    <Text style={styles.titleText}>Buildings</Text>
                    <View style={styles.getStartedContainer}> 

                    </View>
                </View>
            );
    }

    renderContract = () => {
        if (this.state.contractChecked)
            return(
                <View style={styles.welcomeContainer}>
                    <Text style={styles.titleText}>Contracts</Text>
                    <View style={styles.getStartedContainer}> 

                    </View>
                </View>
            );
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.renderBuilding()}
                {this.renderContract()}
            
            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        style = {styles.checkbox}
                        center
                        title='Building'
                        checked={this.state.buildingChecked}
                        onPress={() => this.setState({buildingChecked : !this.state.buildingChecked})}
                    />
                    <CheckBox
                        style = {styles.checkbox}
                        center
                        title='Contract'
                        checked={this.state.contractChecked}
                        onPress={() => this.setState({contractChecked : !this.state.contractChecked})}
                    />
                </View>
            </View>
        </View>
        );
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={this._handleLearnMorePress} style={styles.helpSearchText}>
            Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
            Development mode is enabled, your app will be slower but you can use useful development
            tools. {learnMoreButton}
            </Text>
        );
        } else {
        return (
            <Text style={styles.developmentModeText}>
            You are not in development mode, your app will run at full speed.
            </Text>
        );
        }
    }

    _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
    };

    _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
    };
}

const styles = StyleSheet.create({
    titleText:{
        fontFamily: 'Baskerville',
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText2: {
        fontFamily: 'Baskerville',
        fontSize: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    checkbox: {
        width: '40%',
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
        ios: {
            shadowColor: 'black',
            shadowOffset: { height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        android: {
            elevation: 20,
        },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpSearch: {
        paddingVertical: 15,
    },
    helpSearchText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
