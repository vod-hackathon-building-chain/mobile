import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Icon
} from 'react-native';
import { Dimensions } from "react-native";
import { SearchBar } from 'react-native-elements'
export default class SearchScreen extends React.Component {
    static navigationOptions = {
        title: 'Search'
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                </ScrollView>

                <View style={styles.tabBarInfoContainer}>
                    <SearchBar
                        style={styles.searchBar}
                        containerStyle={{backgroundColor: 'white'}}
                        inputStyle={{backgroundColor: 'white'}}
                        width={width}
                        icon={{ type: 'font-awesome', name: 'search' }}
                        placeholder='search for building...' />
                </View>
            </View>
        );
    }
}

var width = Dimensions.get('window').width; //full width


const styles = StyleSheet.create({
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
    searchBar: {
        backgroundColor: "white"
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
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
        top: 0,
        left: 0,
        right: 0,
        width: width,
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
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpSearch: {
        paddingVertical: 15,
    },
    helpSearchText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});