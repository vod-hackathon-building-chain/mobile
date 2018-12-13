import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Icon,
  RefreshControl
} from 'react-native';
import { Dimensions } from "react-native";
import { CheckBox, List, ListItem, FlatList, Avatar, SearchBar} from 'react-native-elements'
import { BACKEND } from '../constants/Backend';

export default class SearchScreen extends React.Component {
    static navigationOptions = {
        title: 'Search'
    };

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = { contract: [], refreshing: true};
        this.update();
    }

    async update() {
        await BACKEND.UPDATE();
        let contracts = [];
        BACKEND.CONTRACTS.map(contract => {
            if (contract.status === "On Sale" && contract.approvedByGovernment == 1) {
                contracts.push(contract);
            }
        })
        this.setState({contract: contracts, refreshing: false});
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.update();
    }

    renderContract = () => {
        if (this.state.contract) {
            let res = []
            this.state.contract.map(contract => {
                if(contract.status == "On Sale")
                    res.push(contract);
            })
            return (
                <View>
                    <Text style={styles.titleText}>Contract</Text>
                    <List>
                        {res.map(contract => {
                            return <ListItem
                                key= {contract.id}
                                title = {contract.building.address}
                                onPress={() => this.navigation.navigate("Contract", {id: contract.id})}
                                subtitle={
                                    <View style={styles.subtitleView}>
                                        <View><Text style={styles.ratingText}>Status: {contract.status}</Text></View>
                                        <View><Text style={styles.ratingText}>Price: {contract.price}</Text></View>
                                    </View>
                                }
                                avatar={
                                    <Avatar
                                    large
                                    rounded
                                    icon={{name: 'building', type: 'font-awesome'}}/>
                                }
                            />
                        })}
                    </List>
                </View>
            );
        }
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
                 refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                >
                    {this.renderContract()}
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
