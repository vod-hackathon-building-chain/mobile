import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Icon
} from 'react-native';
import { Dimensions } from "react-native";
import { CheckBox, List, ListItem, FlatList, Avatar, SearchBar} from 'react-native-elements'

export default class SearchScreen extends React.Component {
    static navigationOptions = {
        title: 'Search'
    };

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <List>
                    {["one", "two", "three"].map(name => {
                        return <ListItem
                            onPress={() => this.navigation.navigate("Contract")}
                            title={`Pay Building ${name}`}
                            subtitle={
                                <View style={styles.subtitleView}>
                                    <Text style={[styles.ratingText, {fontSize: 20}]}>Price: 150k</Text>
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
                </ScrollView>

                <View style={styles.tabBarInfoContainer}>
                    <SearchBar
                        style={styles.searchBar}
                        containerStyle={{backgroundColor: 'white'}}
                        inputStyle={{backgroundColor: 'white'}}
                        width={width}
                        icon={{ type: 'font-awesome', name: 'search' }}
                        placeholder='search for building...' />
                </View>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width


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
