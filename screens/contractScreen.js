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
import { CheckBox, List, ListItem, FlatList, Avatar, Button} from 'react-native-elements'
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BACKEND } from '../constants/Backend';

const buildingImage = require('../assets/images/contract.jpg');

class User {
    name;
    age;

    constructor(name, age) {this.age = age, this.name = name;}
}

class Contract {
    id = 1;
    verificationStep = 1;
    building = new Building();
    seller = new User("Ahmed", 21);
    buyer = new User("Omar", 26);
}

class Building {
    name = "Building one";
    address = "el agoza ";
    city = "giza";
    electricity = new Building.Electricity();
    gas = new Building.Gas();
    water = new Building.Water();
    id = 1;
    latitude = 123;
    longitudes = 22;
    numberOfRooms = 2;
    area = 150;
    numberOfBathrooms = 1;
    level = 5
    isFurnitured = true

    static Electricity = class {
        totalReader = 16000;
        monthReader = 1500;
        totalToPay = 150;
    }

    static Water = class {
        totalReader = 16500;
        monthReader = 500;
        totalToPay = 120;
    }

    static Gas = class {
        totalReader = 1300;
        monthReader = 130;
        totalToPay = 59;
    }
}

export default class ContractScreen extends React.Component {
    static navigationOptions = {
        title : "BuildingScreen"
    };

    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true};

        BACKEND.CONTRACTS.map(contract => {
            if (contract.id == this.props.navigation.getParam('id')) {
                this.state.contract = contract;
            }
        })
    }

    publish = () => {

    }

    renderBuyer() {
        if (this.state.contract.buyer)
            return (
                <View style={[styles.user, {}]}>
                    <Text style={styles.type} fontSize="30">Buyer</Text>
                    <View style={styles.info}>
                        <Text fontSize="8">{this.contract.buyer.name}</Text>
                    </View>
                    {(this.contract.approvedByBuyer == true) ? 
                        <Text style={[styles.verified, {color: "green"}]}>Accepted</Text> : 
                        <Text style={[styles.verified ,{color: "red"}]}>Not Accepted</Text>}
                    
                </View>
            );
    }

    renderSeller() {
        if (this.state.contract){
            let owner = BACKEND.OWNER;
            return (
                <View style={[styles.user, {}]}>
                    <Text style={styles.type}>Seller</Text>
                    <View style={styles.info}>
                        <Text fontSize="8">{owner.name}</Text>
                    </View>
                    {(this.contract.approvedBySeller == true) ? 
                        <Text style={[styles.verified, {color: "green"}]}>Accepted</Text> : 
                        <Text style={[styles.verified,{color: "red"}]}>Not Accepted</Text>}
                </View>
            );
        }
    }

    renderGovernmentStatus() {
        this.contract = this.state.contract;
        return (
            <View style={[styles.user, {}]}>
                <Text style={[styles.type, {fontSize: 12}]}>Government</Text>
                <View style={styles.info}>
                    <Text></Text>
                </View>
              {(this.contract.approvedByGovernment == true) ? 
                    <Text style={[styles.verified, {color: "green"}]}>Accepted</Text> : 
                    <Text style={[styles.verified,{color: "red"}]}>Not Accepted</Text>}
            </View>
        );
    }

    renderBuildingInfo() {
        this.building = this.state.contract.building;
        return (
            <View>
                <View style={[styles.user, {}]}>
                    <View style={[styles.type, {fontSize: 12}]}>
                        <Text >Building</Text>
                        <Text >Info</Text>
                    </View>
                    
                    <View style={[styles.info, {width: width/4 * 3}]}>
                        <Text style={{fontSize: 15}}>Area {this.building.area}</Text>
                        <Text style={{fontSize: 15}}>City {this.building.city}</Text>
                        <Text style={{fontSize: 15}}>Address {this.building.address}</Text>
                        <Text style={{fontSize: 15}}>Level {this.building.level}</Text>
                        
                        <Text></Text>
                        <Text style={{fontSize: 15}}>{(this.building.isFurnitured) ? 'The building have furniture': 'There is no furniture'}</Text>
                        <Text style={{fontSize: 15}}>N.Room {this.building.numberOfRooms}</Text>
                        <Text style={{fontSize: 15}}>N.Bathroom {this.building.numberOfBathrooms}</Text>
                    </View>
                </View>

                <View style={[styles.user, {}]}>
                    <View style={[styles.type, {fontSize: 12}]}>
                        <Text >Electricity</Text>
                    </View>
                    
                    <View style={[styles.info, {width: width/4 * 3}]}>
                        <Text fontSize="8">Total Read: {this.building.electricityTotalReader} kW</Text>
                        <Text fontSize="8">Current Read: {this.building.electricityMonthReader} kW</Text>
                        <Text fontSize="8">Amount to be pay: {this.building.electricityTotalToPay} EGP</Text>
                    </View>
                </View>

                <View style={[styles.user, {}]}>
                    <View style={[styles.type, {fontSize: 12}]}>
                        <Text >Gas</Text>
                    </View>
                    
                    <View style={[styles.info, {width: width/4 * 3}]}>
                        <Text fontSize="8">Total Read: {this.building.gasTotalReader} m3</Text>
                        <Text fontSize="8">Current Read: {this.building.gasMonthReader} m3</Text>
                        <Text fontSize="8">Amount to be pay: {this.building.gasTotalToPay} EGP</Text>
                    </View>
                </View>

                <View style={[styles.user, {}]}>
                    <View style={[styles.type, {fontSize: 12}]}>
                        <Text >Water</Text>
                    </View>
                    
                    <View style={[styles.info, {width: width/4 * 3}]}>
                        <Text fontSize="8">Total Read: {this.building.waterTotalReader} m3</Text>
                        <Text fontSize="8">Current Read: {this.building.waterMonthReader} m3</Text>
                        <Text fontSize="8">Amount to be pay: {this.building.waterTotalToPay} EGP</Text>
                    </View>
                </View>
                
            </View>
        );
    }

    renderBuildingCondition() {
        return (<View style={{padding: 20}}>
            <Text>By accepting the condition</Text>
            <Text style={{fontSize: 15}}>Buyer</Text>
            <Text>- you accept to buy the money</Text>
            <Text style={{fontSize: 15}}></Text>
            <Text style={{fontSize: 15}}>Seller</Text>
            <Text>- you accept to buy to the government Water</Text>
            <Text>- you accept to buy to the government Gas</Text>
            <Text>- you accept to buy to the government Electricity</Text>
            <Text>- you accept to transfer the builing owenrship</Text>
        </View>)
    }

    render() {
        if(!this.state.contract) {
            return <View></View>
        }else {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={buildingImage}
                    />
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.contract.building.address}</Text>
                        { (this.state.contract.buyer) ? 
                            <TouchableOpacity
                                style= {{borderColor:"#0062cc", borderRadius: 10, borderWidth: 3, padding: 10, color: "white", backgroundColor: "white"}}
                                underlayColor='#fff'>
                                <Text style={{color: "black", fontSize: 20}}>Accept</Text>
                            </TouchableOpacity>                 
                             : <Text></Text>
                        }

                    </View>

                    <View>
                        {this.renderGovernmentStatus()}
                        {this.renderBuyer()}
                        {this.renderSeller()}
                    </View>

                    {this.renderBuildingInfo()}
                    {this.renderBuildingCondition()}
                </ScrollView>
            </View>
        );
        }
    }
}

var width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    type: {
        padding: 15,
        width: width/4,
    },
    info: {
        padding: 15,
        width: width/4,
        borderLeftWidth: 1,
        borderLeftColor: "black"
    },
    verified: {
        padding: 15,
        width: width/4 * 2
    },
    user: {
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    Etitle: {
        paddingLeft: 15,
        width: width/4, 
    },
    Econtent: {
        width: width/4 * 3, 
        borderLeftWidth: 1,
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
        width: width/3, 
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 55
    },
    headerText: {
        textAlign: 'left',
        fontSize: 30,
        paddingLeft: 15,
        width: width/3 + width/3, 
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
