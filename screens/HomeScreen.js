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
  Button,
  
} from 'react-native';
import { CheckBox, List, ListItem, FlatList, Avatar, Icon} from 'react-native-elements'
import { Dimensions } from "react-native";
import { BACKEND } from '../constants/Backend';


export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title : "Property",
        headerRight: ( 
            <TouchableOpacity
                style={{paddingRight: 15, height: 60}}
                onPress={() => navigation.navigate("AddBuilding")}>
                <Text
                    onPress={() => navigation.navigate("AddBuilding")}
                    style={{color: "red", fontSize: 40}}
                >+</Text>
            </TouchableOpacity>
        ),
    });


    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true , building: [], refreshing: true};
        this.navigation = this.props.navigation;
        let self = this;
        this.update();
        this.navigation.setParams({
            navigate: this.props.navigate
        })
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
                <View style={{backgroundColor: "#3e6792", paddingTop: 15}}>
                    <Text style={[styles.titleText, {color: "white", borderWidth: 0}]}>Property</Text>
                    <List containerStyle={{borderColor:"#3e6792", backgroundColor:"#3e6792", padding: 5, borderWidth: 0}}>
                        {this.state.building.map(building => {
                            return <ListItem
                                containerStyle={{marginTop: 5, backgroundColor:"rgb(248, 248, 248)", borderRadius:5}}
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
                                    <Icon
                                    size={50}
                                    color="#3e6792"
                                    type="font-awesome"
                                    name="home"
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
                <View style={{backgroundColor: "#3e6792", borderRadius: 1, paddingTop: 50}}>
                <Text style={[styles.titleText, {color:"white"}]}>Contract</Text>
                <List containerStyle={{borderColor:"#3e6792", backgroundColor:"#3e6792", padding: 5, paddingTop:0, borderWidth: 0}}>
                    {res.map(contract => {
                        return <ListItem
                        containerStyle={{marginTop: 3, backgroundColor:"rgb(248, 248, 248)", borderRadius:5}}
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
                                <Icon
                                size={50}
                                color="#3e6792"
                                type="font-awesome"
                                name="file-text-o"
                                />
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
            
                <View style={{height: 60}}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center", width: width, backgroundColor:"rgb(250,250,250)"}}>
                        <View style={[styles.checkbox, {height: 60, width:width/ 8}]}></View>
                        <View style={{height: 60, width:width/ 8 * 3}}>
                            <CheckBox
                                title='Property'
                                checked={this.state.buildingChecked}
                                onPress={() => this.setState({buildingChecked : !this.state.buildingChecked})}
                            />
                        </View>
                        <View style={[styles.checkbox, {height: 60, width:width/ 8 * 3}]}>
                            <CheckBox
                                title='Contract'
                                checked={this.state.contractChecked}
                                onPress={() => this.setState({contractChecked : !this.state.contractChecked})}
                            />
                        </View>
                        <View style={[styles.checkbox, {height: 60, width:width/ 8}]}></View>
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
        color: 'black'
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
        borderWidth:0
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
