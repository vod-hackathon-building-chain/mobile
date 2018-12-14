import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Dimensions, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { BACKEND } from '../constants/Backend';
import {AppState} from 'react-native'
import { CheckBox, List, ListItem, FlatList, Avatar, SearchBar, Icon} from 'react-native-elements'


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
             <ImageBackground source={require("../assets/images/background.jpg")} style={{width: '100%', height: '100%'}}>
                
            
            <View style={main.container}>
                <Icon
                    size={60}
                    style={{marginBottom: 15,}}
                    color="white"
                    type="font-awesome"
                    name="building-o"
                    />
                
                <Text style={main.titleText}>Building</Text>
                <Text style={main.titleText2}>Chain</Text>
                
                <TextInput
                    value={this.state.email}
                    keyboardType = 'email-address'
                    onChangeText={(email) => this.setState({ email })}
                    placeholder='Email'
                    placeholderTextColor = 'black'
                    style={[main.input, {marginTop: 35, opacity:0.7}]}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    placeholderTextColor = 'black'
                    style={[main.input, {opacity:0.7}]}
                />
                
            
                <TouchableOpacity
                    style={[main.button, {width: width - 80}]}
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
            </ImageBackground>
        );
    }
}

var width = Dimensions.get('window').width; //full width



const main = StyleSheet.create({
    logo: {
        marginTop: 35,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 400,
    },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText:{
     color: "white",
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText2: {
     color: "white",
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(64, 152, 193, 0.7)',
    marginTop: 15,
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
    color: "white",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    width: width - 80,
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
