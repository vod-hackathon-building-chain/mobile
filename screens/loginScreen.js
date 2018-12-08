import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import { Dimensions } from "react-native";
import { white } from 'ansi-colors';

export default class LoginScreen extends React.Component {
   state = {
      email: '',
      password: '',
    };
  
  
  onLogin() {
    const { email, password } = this.state;

    Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  }

    submit() {
        //Do Something
    }

    login() {

    }

    signUp() {

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
                    style={main.button}>
                
                    <Button
                        onPress={this.login}
                        title="Login"
                        color="black"
                    />
                </TouchableOpacity>

                <Button
                    style={main.secondBtn}
                    onPress={this.signUp}
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
    fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText2: {
    fontFamily: 'Baskerville',
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
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginVertical: 10,
  },
});
