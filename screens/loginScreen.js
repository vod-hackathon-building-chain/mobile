import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Login',
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = { email: 'building_chain@blockchain.com', password: '12345678' };
    }
    

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login = () => {
        if (this.state.email === "" || this.state.password === "") {
            Alert.alert('Credentials', `email or password is not valid`);
            return;
        }

        if (this.validateEmail(this.state.email) === false)  {
            Alert.alert('Credentials', `email is not valid`);
            return;
        }

        this.navigation.replace("Home");
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
                    <Button
                        onPress={this.login}
                        title="Login"
                        color="black"
                    />
                </TouchableOpacity>

                <Button
                    style={main.secondBtn}
                    onPress={() => this.navigation.navigate("SignUp")}
                    title="Sign Up"
                    color="black"
                />
                    
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
    backgroundColor: '#E8FCE5',
  },
  titleText:{
     
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText2: {
     
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#C3F3BC',
    width: 200,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  secondBtn: {
    alignItems: 'center',
    width: 200,
    color: "#C3F3BC",
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
