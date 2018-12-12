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
        this.state = { buildingChecked: true, contractChecked: true };
        this.contract = new Contract();
        this.building = this.contract.building;
    }

    publish = () => {

    }

    renderBuyer() {
        return (
            <View style={[styles.user, {backgroundColor: "#E8FCE5"}]}>
                <Text style={styles.type} fontSize="30">Buyer</Text>
                <View style={styles.info}>
                    <Text fontSize="8">{this.contract.buyer.name}</Text>
                </View>
                {(this.contract.verificationStep >= 1) ? 
                    <Text style={[styles.verified, {color: "green"}]}>Accept</Text> : 
                    <Text style={styles.verified}>Not Accept Yet</Text>}
                
            </View>
        );
    }

    renderSeller() {
        return (
            <View style={[styles.user, {backgroundColor: "#E8FCE5"}]}>
                <Text style={styles.type} fontSize="30">Seller</Text>
                <View style={styles.info}>
                    <Text fontSize="8">name: {this.contract.seller.name}</Text>
                </View>
                {(this.contract.verificationStep >= 3) ? 
                    <Text style={[styles.verified, {color: "green"}]}>Accept</Text> : 
                    <Text style={styles.verified}>Not Accept Yet</Text>}
            </View>
        );
    }

    renderGovernmentStatus() {
        return (
            <View style={[styles.user, {backgroundColor: "#E8FCE5"}]}>
                <Text style={[styles.type, {width: width/5 * 2}]} fontSize="25">Government</Text>
                <View style={[styles.verified, {width: width/5 * 3}]}>{(this.contract.verificationStep == 4) ? 
                    <Text style={{color: "green"}}>Accept</Text> : <Text>Not Accept Yet</Text>}</View>
            </View>
        );
    }

    renderBuildingInfo() {
        return (
            <View>
                <Text style={{padding:20, fontSize: 25}}>Building Info</Text>
                <View style={[styles.header, {marginLeft: 10,borderLeftColor: "black", borderLeftWidth: 2}]} flexDirection="horizontal" alignItems="left" paddingLeft="3%" >
                    <Text style={{fontSize: 15}}>Area {this.building.area}</Text>
                    <Text style={{fontSize: 15}}>City {this.building.city}</Text>
                    <Text style={{fontSize: 15}}>Address {this.building.address}</Text>
                    <Text style={{fontSize: 15}}>Level {this.building.level}</Text>
                    
                    <Text></Text>
                    <Text style={{fontSize: 15}}>{(this.building.isFurnitured) ? 'The building have furniture': 'There is no furniture'}</Text>
                    <Text style={{fontSize: 15}}>N.Room {this.building.numberOfRooms}</Text>
                    <Text style={{fontSize: 15}}>N.Bathroom {this.building.numberOfBathrooms}</Text>
                    
                </View>


                <View style={styles.electricity}>
                    <Text style={styles.Etitle} fontSize="30">Electricity</Text>
                    <View style={styles.Econtent}>
                        <Text fontSize="8">Total Read : {this.building.electricity.totalReader}</Text>
                        <Text fontSize="8">Current Read : {this.building.electricity.monthReader}</Text>
                        <Text fontSize="8">my pays : {this.building.electricity.totalToPay}</Text>
                    </View>
                </View>

                <View style={styles.electricity}>
                    <Text style={styles.Etitle} fontSize="30">Gas</Text>
                    <View style={styles.Econtent}>
                        <Text fontSize="8">Total Read : {this.building.gas.totalReader}</Text>
                        <Text fontSize="8">Current Read : {this.building.gas.monthReader}</Text>
                        <Text fontSize="8">my pays : {this.building.gas.totalToPay}</Text>
                    </View>
                </View>

                <View style={styles.electricity}>
                    <Text style={styles.Etitle} fontSize="30">Water</Text>
                    <View style={styles.Econtent}>
                        <Text fontSize="8">Total Read : {this.building.water.totalReader}</Text>
                        <Text fontSize="8">Current Read : {this.building.water.monthReader}</Text>
                        <Text fontSize="8">my pays : {this.building.water.totalToPay}</Text>
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
            <Text>- you accept to transfer the builing owenr to {this.contract.seller.name}</Text>
        </View>)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Image
                        style={styles.logo}
                        source={buildingImage}
                    />
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{this.building.name}</Text>
                        <TouchableOpacity
                            style={styles.headerBtn}
                            backgroundColor="#C3F3BC"
                            onPress={this.publish}>
                            <Button
                                onPress={this.publish}
                                title="Accept"
                                color="black"
                                backgroundColor="#C3F3BC"
                            />
                        </TouchableOpacity>
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
        borderRightWidth: 1,
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
