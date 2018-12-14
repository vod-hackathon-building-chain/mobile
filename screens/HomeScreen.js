import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Button
} from 'react-native';
import { CheckBox, List, ListItem, FlatList, Avatar} from 'react-native-elements'
import { Dimensions } from "react-native";
import { BACKEND } from '../constants/Backend';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title : "Property",
        headerRight: (
            <TouchableOpacity
                style={{padding: 13, width: width/5, height: 60}}
                onPress={() => this.props.navigation.navigate("AddBuilding")}>
                <Text
                    onPress={() => this.props.navigation.navigate("AddBuilding")}
                    style={{color: "blue", fontSize: 30}}
                >+</Text>
            </TouchableOpacity>
        ),
    };


    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true , building: [], refreshing: true};
        this.navigation = this.props.navigation;
        let self = this;
        this.update();
    }

    async update() {
        await BACKEND.UPDATE();
        
        let contracts = [];
        BACKEND.CONTRACTS.map(contract => {
            if (contract.building.ownerId === BACKEND.OWNER.id) {
                contracts.push(contract);
            }
        })

        let building = [];        
        BACKEND.BUILDINGS.map(object => {
            building.push({
                address: object["address"],    
                area: object["area"],
                city: object["city"],
                level: object["level"],
                id: object["id"]
            })
        })
        this.setState({contract: contracts, building: building, refreshing: false});
    }

    renderBuilding = () => {
        if (this.state.buildingChecked && this.state.building)
            return (                
                <View>
                    <Text style={styles.titleText}>Building</Text>
                    <List>
                        {this.state.building.map(building => {
                            return <ListItem
                                onPress={() => this.navigation.navigate("Building", {
                                    id: building.id
                                })}
                                key={building.id}
                                title={`${building.address}`}
                                subtitle={
                                    <View style={styles.subtitleView}>
                                        <Text style={styles.ratingText}>City: {building.city}</Text>
                                        <Text style={styles.ratingText}>Area: {building.area} M2</Text>
                                        <Text style={styles.ratingText}>Floor: {building.level}</Text>
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
        let res = []
        if (this.state.contractChecked && this.state.contract){
            this.state.contract.map(contract => {
                res.push(contract);
            })

            return (
                <View>
                <Text style={styles.titleText}>Contract</Text>
                <List>
                    {res.map(contract => {
                        return <ListItem
                            key={contract.id}
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

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.update();
    }

    render() {
        return (
            <View style={{height: height}}>
                <View style={{height: 60, backgroundColor:"rgb(250,250,250)"}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                            
                            <CheckBox
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                style={[styles.checkbox, {width: width/5 * 2, height: 60}]}
                                center
                                title='Building'
                                checked={this.state.buildingChecked}
                                onPress={() => this.setState({buildingChecked : !this.state.buildingChecked})}
                            />

                            <CheckBox
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                style={[styles.checkbox, {width: width/5 * 2}]}
                                center
                                title='Contract'
                                checked={this.state.contractChecked}
                                onPress={() => this.setState({contractChecked : !this.state.contractChecked})}
                            />
                    </View>
                </View>
                <ScrollView style={{}}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {this.renderBuilding()}
                    <View style={styles.line}></View>
                    {this.renderContract()}
                    
                </ScrollView>     
                {
                    Platform.OS === 'ios'
                    ? <View style={{height: 170}}></View>
                    : <View style={{height: 125}}></View>
                }
                
            </View>
        );
    }
}

var height = Dimensions.get('window').height; //full width
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
        backgroundColor: '#fff'
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        borderWidth:0,
        width: '50%',
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 10
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
