import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, StatusBar, 
    TextInput, View, StyleSheet} from 'react-native';
import {CheckBox} from "react-native-elements";
import { Dimensions } from "react-native";
import { white } from 'ansi-colors';
import { BACKEND } from '../constants/Backend';

export default class AddBuilding extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title : "Add Building"
    });
    constructor(props) {
        super(props);

        this.navigation = this.props.navigation;
        this.state = { email: 'building_chain@blockchain.com', password: 'password', fname: 'ahmed', nationalId: '292931923921923929399', phone: '01234567891' };
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    signUp = async () => {
        
        if (this.state.email === "" || this.state.password === "") {
            Alert.alert('Credentials', `email or password is not valid`);
            return;
        }

        if (this.validateEmail(this.state.email) === false)  {
            Alert.alert('Credentials', `email is not valid`);
            return;
        }

        let res = await fetch(BACKEND.REGISTER, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: `${this.state.fname}`,
                nationalId: this.state.nationalId,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.phone,
                role: "User"
            })
        });
        if (res.status == 200) {
            this.navigation.replace("Home");
        } else {
            Alert.alert("there is error in the info")
        }
    }

    renderBalaconyAndRoomAndBathroom = () => {
        return (
            <View style={{flex: 0, flexDirection: "row", paddingTop: 0, paddingBottom: 0}}>
                <TextInput
                    value={this.state.numberOfRooms}
                    onChangeText={(numberOfRooms) => this.setState({ numberOfRooms })}
                    placeholder='N. Room'
                    keyboardType = 'number-pad'
                    placeholderTextColor = 'black'
                    style={[main.input, {width: width/ 3}]}
                />

                <TextInput
                    value={this.state.numberOfBalcony}
                    onChangeText={(numberOfBalcony) => this.setState({ numberOfBalcony })}
                    placeholder='N. Balacony'
                    keyboardType = 'number-pad'
                    placeholderTextColor = 'black'
                    style={[main.input, {width: width/ 3, marginLeft: 5}]}
                />
            </View>);
    }

    renderIsFurntureAndArea = () => {
        return ( 
            <View style={{flex: 0, flexDirection: "row", marginTop: 0, marginBottom:0}}>
               
                <TextInput
                    value={this.state.level}
                    keyboardType = 'number-pad'
                    onChangeText={(level) => this.setState({ level })}
                    placeholder='Floor'
                    placeholderTextColor = 'black'
                    style={[main.input, {width: width/ 3}]}
                />
                <TextInput
                    value={this.state.area}
                    keyboardType = 'number-pad'
                    onChangeText={(area) => this.setState({ area })}
                    placeholder='Area'
                    placeholderTextColor = 'black'
                    style={[main.input, {width: width/ 3,  marginLeft: 5}]}
                />
            </View>
        );
    }

    render() {
        return (
            <View style={main.container}>
                <TextInput
                    value={this.state.address}
                    onChangeText={(address) => this.setState({ address })}
                    placeholder='Address'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                
                <CheckBox
                    style = {{width: width/ 2, height: 10}}
                    checked={this.state.isFurnitured}
                    title="Has Furniture"
                    onPress={() => this.setState({isFurnitured : !this.state.isFurnitured})}
                />
                
                {this.renderBalaconyAndRoomAndBathroom()}
                {this.renderIsFurntureAndArea()}
                
                

                <TextInput
                    value={this.state.city}
                    onChangeText={(city) => this.setState({ city })}
                    placeholder='City'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                <TextInput
                    value={this.state.price}
                    onChangeText={(price) => this.setState({ price })}
                    placeholder={'Price'}
                    secureTextEntry={true}
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                
               <TouchableOpacity
                    style={main.button}
                    onPress={this.signUp}>
                    <Text
                        onPress={this.signUp}
                        style={{color: "white", fontSize: 20}}
                    >Submit</Text>
                </TouchableOpacity>
                    
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width


const main = StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
  },
  titleText:{
     color: "white",
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText2: {
    color: "white",
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText3: {
     color: "white",
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',

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
  input: {
    width: width - 50,
    borderRadius: 5,
    backgroundColor: "rgb(250,250,250)",
    borderWidth:1,
    color: "black",
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgb(250,250,250)",
    marginVertical: 10,
  },
});
