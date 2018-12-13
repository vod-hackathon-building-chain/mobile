import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import { BACKEND } from '../constants/Backend';
import {AppState} from 'react-native'

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Login',
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = { email: 'building_chain@blockchain.com', password: 'password', appState: {}};
    }
    


    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login = async () => {
        if (this.state.email === "" || this.state.password === "") {
            Alert.alert('Credentials', `email or password is not valid`);
            return;
        }

        if (this.validateEmail(this.state.email) === false)  {
            Alert.alert('Credentials', `email is not valid`);
            return;
        }

        const rawResponse = await fetch(BACKEND.LOGIN, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        });

        
        if(rawResponse.status != 200) {
            Alert.alert("you credential is wrong")
        }else {
            user = await rawResponse.json();
            BACKEND.OWNER = user["user"];
            this.navigation.replace("Home");
        }
    }

    render() {
        return (
            <View style={main.container}>
                <Text style={main.titleText}>Building</Text>
                <Text style={main.titleText2}>Chain</Text>
                <TextInput
                    value={this.state.email}
                    keyboardType = 'email-address'
                    onChangeText={(email) => this.setState({ email })}
                    placeholder='Email'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                
            
                <TouchableOpacity
                    style={main.button}
                    onPress={this.login}>
                    <Text
                        onPress={this.login}
                        style={{color: "white", fontSize: 20}}
                    >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.navigation.navigate("SignUp")}>
                    <Text
                        onPress={() => this.navigation.navigate("SignUp")}
                        style={{color: "white", fontSize: 20}}
                    >Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width



const main = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343a40',
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
    color: "#0062cc",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: width - 50,
    borderRadius: 5,
    backgroundColor: "white",
    color: "black",
     
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});
