import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import { white } from 'ansi-colors';

export default class SignUpScreen extends React.Component {
    static navigationOptions = {
        header: null,
        title: 'Sign Up',
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', username:'', fname: '', sname: '' };
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    signUp = () => {
        
        if (this.state.email === "" || this.state.password === "") {
            Alert.alert('Credentials', `email or password is not valid`);
            return;
        }

        if (this.validateEmail(this.state.email) === false)  {
            Alert.alert('Credentials', `email is not valid`);
            return;
        }

        Alert.alert('Credentials', `Success`);

    }

    render() {
        return (
            <View style={main.container}>
                <Text style={main.titleText}>Building</Text>
                <Text style={main.titleText2}>Chain</Text>
                <Text style={main.titleText3}>Sign Up Form</Text>
                <TextInput
                    value={this.state.fname}
                    onChangeText={(fname) => this.setState({ fname })}
                    placeholder='First Name'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                <TextInput
                    value={this.state.sname}
                    onChangeText={(sname) => this.setState({ sname })}
                    placeholder='Family Name'
                    placeholderTextColor = 'black'
                    style={main.input}
                />
                <TextInput
                    value={this.state.username}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder='Username'
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
                    <Button
                        onPress={this.signUp}
                        title="Sign Up"
                        color="black"
                    />
                </TouchableOpacity>
        
                <Button
                    style={main.secondBtn}
                    onPress={() => this.props.navigation.navigate("Login")}
                    title="Login"
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
  titleText3: {
     
    fontSize: 15,
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
     
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});
