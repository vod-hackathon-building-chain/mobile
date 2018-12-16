import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, StatusBar, 
    TextInput, View, StyleSheet, ScrollView} from 'react-native';
import {CheckBox} from "react-native-elements"
import { MapView, Constants, Location, Permissions } from 'expo';

import { Dimensions } from "react-native";
import { white } from 'ansi-colors';
import { BACKEND } from '../constants/Backend';

export default class AddBuilding extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title : "Add Building"
    });
    constructor(props) {
        super(props);
        this.state = {        
            address: undefined,
            latitude: 13,
            longitudes: 13,
            numberOfRooms: undefined,
            numberOfBathrooms: undefined,
            numberOfBalcony: undefined,
            level: undefined,
            area: undefined,
            isFurnitured: undefined,
            city:undefined,
            approved:undefined,
            price: undefined,
            mapRegion: null,
            lastLat: null,
            lastLong: null,
            location: {
                accuracy: 5,
                altitude: 0,
                altitudeAccuracy: -1,
                heading: -1,
                latitude: 30.073310,
                longitude: 31.018056,
                speed: -1,
                latitudeDelta:  0.00922*1,
                longitudeDelta: 0.00421*1
            }
        };
        this.navigation = this.props.navigation;
        
    }
    
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    submit = async () => {
        
        let res = await fetch(BACKEND.BUILDING, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: this.state.address,
                latitude: this.state.location.latitude.toString(),
                longitudes: this.state.location.longitude.toString(),
                numberOfRooms: this.state.numberOfRooms,
                numberOfBathrooms: this.state.numberOfBathrooms,
                numberOfBalcony: this.state.numberOfBalcony,
                level: this.state.level,
                area: this.state.area,
                isFurnitured: this.state.isFurnitured,
                city: this.state.city,
                price: this.state.price,
                ownerId: BACKEND.OWNER.id
            })
        });

        if (res.status == 200) {
            Alert.alert("Done added")
            this.navigation.navigate("Home");
        } else {
            Alert.alert("there is error in the info")
        }
    }

    markerClick = (p) => {
        this.setState(this.state.location);
    }

    getInitialState = () => {
        return {
            region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            },
        };
        }

    onRegionChange = (region) => {
        this.state.location = region;
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                <View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >Address</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.address}
                                onChangeText={(address) => this.setState({ address })}
                                placeholder='Ex: 1 El cairo street'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >Price</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.price}
                                onChangeText={(price) => this.setState({ price })}
                                placeholder='Ex: 159 k'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >City</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.city}
                                onChangeText={(city) => this.setState({ city })}
                                placeholder='Ex: Giza'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >N. Room</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.numberOfRooms}
                                onChangeText={(numberOfRooms) => this.setState({ numberOfRooms })}
                                placeholder='Ex: 3 Room'
                                keyboardType = 'number-pad'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >N. Bathroom</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.numberOfBathrooms}
                                onChangeText={(numberOfBathrooms) => this.setState({ numberOfBathrooms })}
                                placeholder='Ex: 1 Bathroom'
                                keyboardType = 'number-pad'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >N. Balcony</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.numberOfBalcony}
                                onChangeText={(numberOfBalcony) => this.setState({ numberOfBalcony })}
                                placeholder='Ex: 3 Balcony'
                                keyboardType = 'number-pad'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >Floor</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.level}
                                onChangeText={(level) => this.setState({ level })}
                                placeholder='Ex: in floor 2'
                                keyboardType = 'number-pad'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >Area M2</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                            <TextInput
                                value={this.state.area}
                                onChangeText={(area) => this.setState({ area })}
                                placeholder='Ex: 150 M2'
                                keyboardType = 'number-pad'
                                placeholderTextColor = '#E3E3E3'
                                style={{width: width/ 3  * 2}}
                            />
                        </View>
                    </View>
                    <View style={[styles.user, {backgroundColor:"white", margin: 5, borderRadius: 10}]}>
                        <View style={[styles.type, {fontSize: 18}]}>
                            <Text >Furniture</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3, fontSize: 18}]}>
                        <CheckBox
                            style={{width: width/ 3  * 2}}
                            checked={this.state.isFurnitured}
                            onPress={() => this.setState({isFurnitured : !this.state.isFurnitured})}
                        />
                        </View>
                    </View>
                     
                    <MapView
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                        style = {styles.map}
                        showsUserLocation = {true}
                        followUserLocation = {true}
                        zoomEnabled = {true}    
                    >
                    <MapView.Marker
                        coordinate={this.state.location}
                        region = {this.state.region}
                        title={"Title"}
                        
                        description="Description">
                            <MapView.Callout tooltip>
                                <TouchableOpacity onPress= {this.markerClick} underlayColor='#dddddd'>
                                    <View>
                                        <Text>{"The Locaiton"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </MapView.Callout>
                        </MapView.Marker>
                    </MapView>


                    <View style={[styles.user]}>
                        <TouchableOpacity
                            style={[styles.button, {backgroundColor:"white", color:"blue", width: width}]}
                            alignItems="center"
                            onPress={this.markerClick}>
                            <Text
                                onPress={this.markerClick}
                                style={{color: "blue", fontSize: 20}}
                            >Pick the location</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.user]}>
                        <TouchableOpacity
                            style={[styles.button, {width: width/ 2}]}
                            alignItems="center"
                            onPress={this.submit}>
                            <Text
                                onPress={this.submit}
                                style={{color: "white", fontSize: 20}}
                            >Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ScrollView>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    map: {
        height: 400,
        marginTop: 80
    },
      button: {
        alignItems: 'center',
        backgroundColor: '#0062cc',
        
        width: 200,
        marginBottom: 20,
        padding: 10,
        borderColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        },

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
        backgroundColor: "#51567B"
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
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    }
});
