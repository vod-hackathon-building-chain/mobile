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

const buildingImage = require('../assets/images/map.png');

class Building {
    name = "Building one";
    location = "el agoza ";
    city = "giza";
    electricity = new Building.Electricity();
    gas = new Building.Gas();
    water = new Building.Water();

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

export default class BuildingScreen extends React.Component {
    static navigationOptions = {
        title : "BuildingScreen"
    };

    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true };
        this.building = new Building();
    }

    publish = () => {

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
                                title="Publish"
                                color="black"
                                borderRadius= "55"
                                backgroundColor="#C3F3BC"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.header} flexDirection="horizontal" alignItems="left" paddingLeft="2%">
                        <Text >City {this.building.city}</Text>
                        <Text >Address {this.building.location}</Text>
                    </View>


                    <View style={styles.electricity}>
                        <Text style={styles.Etitle} fontSize="30">Electricity</Text>
                        <View style={styles.Econtent}>
                            <Text fontSize="8">Total Read : {this.building.electricity.totalReader}</Text>
                            <Text fontSize="8">Current Read : {this.building.electricity.monthReader}</Text>
                            <Text fontSize="8">my pays : {this.building.electricity.totalToPay}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                            onPress={this.publish}>
                            <Button
                                marginTop = "5"
                                onPress={this.publish}
                                title="Pay"
                                color="black"
                                backgroundColor= '#E8FCE5'
                            />
                        </TouchableOpacity>

                    <View style={styles.electricity}>
                        <Text style={styles.Etitle} fontSize="30">Gas</Text>
                        <View style={styles.Econtent}>
                            <Text fontSize="8">Total Read : {this.building.gas.totalReader}</Text>
                            <Text fontSize="8">Current Read : {this.building.gas.monthReader}</Text>
                            <Text fontSize="8">my pays : {this.building.gas.totalToPay}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                            onPress={this.publish}>
                            <Button
                                marginTop = "5"
                                onPress={this.publish}
                                title="Pay"
                                color="black"
                                backgroundColor= '#E8FCE5'
                            />
                        </TouchableOpacity>

                    <View style={styles.electricity}>
                        <Text style={styles.Etitle} fontSize="30">Water</Text>
                        <View style={styles.Econtent}>
                            <Text fontSize="8">Total Read : {this.building.water.totalReader}</Text>
                            <Text fontSize="8">Current Read : {this.building.water.monthReader}</Text>
                            <Text fontSize="8">my pays : {this.building.water.totalToPay}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                            onPress={this.publish}>
                            <Button
                                marginTop = "5"
                                backgroundColor= '#E8FCE5'
                                onPress={this.publish}
                                title="Pay"
                                color="black"
                            />
                        </TouchableOpacity>
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
