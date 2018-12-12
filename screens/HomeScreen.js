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
import { CheckBox, List, ListItem, FlatList, Avatar} from 'react-native-elements'

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title : "Home Screen"
    };


    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true };
        this.navigation = this.props.navigation;
    }

    renderBuilding = () => {
        if (this.state.buildingChecked)
            return (                
                <View>
                    <Text style={styles.titleText}>Building</Text>
                    <List>
                        {["one", "two", "three"].map(name => {
                            return <ListItem
                                onPress={() => this.navigation.navigate("Building")}
                                title={`building one ${name}`}
                                subtitle={
                                    <View style={styles.subtitleView}>
                                        <Text style={styles.ratingText}>City: giza</Text>
                                        <Text style={styles.ratingText}>Location: el agoza street abo nour</Text>
                                        <Text style={styles.ratingText}>area: 150m</Text>
                                    </View>
                                }
                                avatar={
                                    <Avatar
                                    large
                                    rounded
                                    icon={{name: 'home', type: 'font-awesome'}}
                                    />
                                }
                            />
                        })}
                    </List>
                </View>
            );
    }

    renderContract = () => {
        if (this.state.contractChecked)
            return (
                <View>
                    <Text style={styles.titleText}>Contracts</Text>
                    <List>
                    <ListItem
                        title='building one'
                        onPress={() => this.navigation.navigate("Contract")}
                        subtitle={
                            <View style={styles.subtitleView}>
                                <View><Text style={styles.ratingText}>Status: Running</Text></View>
                                <View><Text style={styles.ratingText}>Since 3 day</Text></View>
                            </View>
                        }
                        avatar={
                            <Avatar
                            large
                            rounded
                            icon={{name: 'building', type: 'font-awesome'}}/>
                        }
                    />
                    </List>

                </View>
            );
    }

    render() {
        return (
            
            <View style={styles.container}>
                
                <ScrollView style={styles.container}>
                    {this.renderBuilding()}
                    <View style={styles.line}></View>
                    {this.renderContract()}
                </ScrollView>

                <View style={styles.tabBarInfoContainer}>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            style={styles.checkbox}
                            center
                            title='Building'
                            checked={this.state.buildingChecked}
                            onPress={() => this.setState({buildingChecked : !this.state.buildingChecked})}
                        />
                        <CheckBox
                            style={styles.checkbox}
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
    line: {
        marginTop: 15
    },
    card: {
        backgroundColor: "grey"
    },
    subtitleView: {
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    },
    titleText:{
        fontSize: 30,
        paddingLeft:10
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
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
