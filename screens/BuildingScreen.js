import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl
} from 'react-native';
import { CheckBox, List, ListItem, FlatList, Avatar, Button} from 'react-native-elements'
import { Dimensions } from "react-native";
import { BACKEND } from '../constants/Backend';
import { MapView, Constants, Location, Permissions } from 'expo';

const buildingImage = require('../assets/images/map.png');


export default class BuildingScreen extends React.Component {
    static navigationOptions = {
        title : "BuildingScreen"
    };

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        let self = this;
        this.state = { buildingChecked: true, contractChecked: true, building: [], refreshing: true};
        this.update();
    }

    async update() {
        await BACKEND.UPDATE();
        let b;
        BACKEND.BUILDINGS.map(building => {
            if (building.id == this.props.navigation.getParam('id')) {
                b = {
                    id: building.id,
                    price: building["price"],
                    name: building.address,
                    area: building.area,
                    city: building.city,
                    floor: building.level,
                    isFurnitured: building.isFurnitured,
                    numberOfRooms: building.numberOfRooms,
                    longitude: building.longitudes,
                    latitude: building.latitude,
                    numberOfBathrooms: building.numberOfBathrooms,
                    water: {
                        totalReader: building.waterTotalReader,
                        monthly: building.waterMonthReader,
                        pay: building.waterTotalToPay,
                    },
                    gas: {
                        totalReader: building.gasTotalReader,
                        monthly: building.gasMonthReader,
                        pay: building.gasTotalToPay,
                    },
                    electricity: {
                        totalReader: building.electricityTotalReader,
                        monthly: building.electricityMonthReader,
                        pay: building.electricityTotalToPay,
                    }
                };
            }
        });
        
        this.setState({building: b, refreshing: false});
    }
    
    sell = async () => {
        const res = await fetch(BACKEND.CONTRACT, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price: this.state.building.price,
                    buildingId: this.state.building.id,
                    status: "On Sale"
                })
            }
        );

        if (res.status == 200) {
            this.navigation.replace("Home");
        }else {
            Alert.alert("This building is already on sale")
        }
    }

    getpay(obj, w, info) {
        if (obj) {
            return (
                <View style={{backgroundColor: "#fff", margin: 5, borderRadius: 15}}>
                    <View style={styles.electricity}>
                    <Text style={styles.Etitle} fontSize="30">{info}</Text>
                    <View style={styles.Econtent}>
                        <Text fontSize="8">Total Read: {obj.totalReader} {w}</Text>
                        <Text fontSize="8">Current Read: {obj.monthly} {w}</Text>
                        <Text fontSize="8">Amount to be pay: {obj.pay} EGP</Text>
                    </View>
                    </View>
                    <TouchableOpacity
                        style= {{borderRadius: 2, padding: 10, margin: 10, backgroundColor: "white", borderColor: "blue" }}
                        underlayColor='#fff'>
                        <Text style={{color: "blue", fontSize: 20, textAlign: "center"}}>Pay</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.update();
    }

    renderMap = () => {
        console.log(this.state.building, this.state.building.latitude, this.state.building.longitude)
        if(this.state.building.latitude && this.state.building.longitude)
        return (                <MapView
                    initialRegion={{
                        latitude: parseFloat(this.state.building.latitude),
                        longitude: parseFloat(this.state.building.longitude),
                        latitudeDelta: 0.0060,
                        longitudeDelta: 0.060,
                    }}
                        style = {[styles.map, styles.logo]}
                        showsUserLocation = {true}
                        followUserLocation = {true}
                    >
                    <MapView.Marker
                        coordinate={{
                            accuracy: 5,
                            altitude: 0,
                            altitudeAccuracy: -1,
                            heading: -1,
                            latitude: parseFloat(this.state.building.latitude),
                            longitude: parseFloat(this.state.building.longitude),
                            speed: -1,
                            latitudeDelta:  0.0060,
                            longitudeDelta: 0.0060
                        }}
                        description="Description">
                            <MapView.Callout tooltip>
                                <TouchableOpacity underlayColor='#dddddd'>
                                    <View>
                                        <Text>{"Locaiton"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </MapView.Callout>
                        </MapView.Marker>
                    </MapView>);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} 
                 refreshControl={
                <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh}
                />
                }
                >

                {this.renderMap()}
                    
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.building.name}</Text>
                            <TouchableOpacity
                                onPress = {this.sell}
                                style= {{borderColor:"#0062cc", borderRadius: 10, borderWidth: 3, padding: 10, color: "white", backgroundColor: "white"}}
                                underlayColor='#fff'>
                                <Text style={{fontSize: 20}}>Sell</Text>
                            </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor: "#fff", margin: 5, borderRadius: 15}}>
                        <View style={styles.electricity}>
                            <Text style={styles.Etitle} fontSize="30">Info</Text>
                            <View style={styles.Econtent}>
                            <Text style={{fontSize: 15}}>Price: {this.state.building.price}</Text>
                            <Text style={{fontSize: 15}}>Area: {this.state.building.area}</Text>
                            <Text style={{fontSize: 15}}>City: {this.state.building.city}</Text>
                            <Text style={{fontSize: 15}}>Floor: {this.state.building.floor}</Text>
                            
                            <Text></Text>
                            <Text style={{fontSize: 15}}>{(this.state.building.isFurnitured) ? 'The building has furniture': 'There is no furniture'}</Text>
                            <Text style={{fontSize: 15}}>N.Room: {this.state.building.numberOfRooms}</Text>
                            <Text style={{fontSize: 15}}>N.Bathroom: {this.state.building.numberOfBathrooms}</Text>
                        </View>
                    </View>
                </View>


                    {this.getpay(this.state.building.electricity, "kW", "Electricity")}
                    {this.getpay(this.state.building.gas, "m3", "Gas")}
                    {this.getpay(this.state.building.water, "m3", "Water")}
                </ScrollView>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    Etitle: {
        paddingLeft: 15,
        width: width/4, 
    },
    Econtent: {
        width: width/4 * 3, 
        borderLeftWidth: 2,
        paddingLeft: 10,
        borderLeftColor: "black"
    },
    electricity: {
        paddingTop: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    headerBtn: {
        textAlign: 'center',
        width: width/4, 
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 55
    },
    headerText: {
        textAlign: 'left',
        fontSize: 20,
        paddingLeft: 15,
        width: width/4 * 3, 
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    header: {
        paddingTop: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
        flexDirection: 'row'
    },
    secondBtn: {
        alignItems: 'center',
        width: 200,
        color: "black",
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    logo: {
        marginTop: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 400,
    },
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
