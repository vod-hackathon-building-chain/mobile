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
import { CheckBox } from 'react-native-elements'


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title : "Home Screen"
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
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
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
    }
});
