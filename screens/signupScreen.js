import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet, ImageBackground } from 'react-native';
import { Dimensions } from "react-native";
import { white } from 'ansi-colors';
import { BACKEND } from 'BrokerMobile/screens/constants/Backend';

export default class SignUpScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Sign Up',
        headerLeft: null
    };

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

        if(res.status != 200) {
            Alert.alert("you credential is wrong")
        }else {
            let user = await res.json();
            Alert.alert("Please Don't share you token key with any one it's very important", user["user"]["hash"])
            BACKEND.OWNER = user["user"];
            this.navigation.replace("Home");
        }
    }

    render() {
        return (
            <ImageBackground source={require("../assets/images/background.jpg")} style={{width: '100%', height: '100%'}}>
                
                <View style={main.container}>
                <TextInput
                    value={this.state.fname}
                    onChangeText={(fname) => this.setState({ fname })}
                    placeholder='First Name'
                    placeholderTextColor = 'black'
                    style={[main.input,{opacity:0.7}]}
                />
                <TextInput
                    value={this.state.nationalId}
                    onChangeText={(nationalId) => this.setState({ nationalId })}
                    placeholder='National Id'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                <TextInput
                    value={this.state.email}
                    keyboardType = 'email-address'
                    onChangeText={(email) => this.setState({ email })}
                    placeholder='Email'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                <TextInput
                    value={this.state.phone}
                    keyboardType = 'phone-address'
                    onChangeText={(phone) => this.setState({ phone })}
                    placeholder='Phone'
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
                    onPress={this.signUp}>
                    <Text
                        onPress={this.signUp}
                        style={{color: "white", fontSize: 20}}
                    >SignUp</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}>
                    <Text
                        onPress={() => this.props.navigation.navigate("Login")}
                        style={{color: "white", fontSize: 20}}
                    >Login</Text>
                </TouchableOpacity>
                    
            </View>
            </ImageBackground>
        );
    }
}

var width = Dimensions.get('window').width; //full width


const main = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'rgba(64, 152, 193, 0.7)',
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
    backgroundColor: "white",
    color: "black",
    opacity:0.7,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});
