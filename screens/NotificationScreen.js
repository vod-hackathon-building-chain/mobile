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

export default class NotificationScreen extends React.Component {
    static navigationOptions = {
        title: 'Notification',
    };


    constructor(props) {
        super(props);
    }

    randomText(indx) {
        return ["Gas", "Water", "Electricity"][(indx * 100) % 3];  
    }

    randomSalary = () => {
        return ((10000 * Math.random()) % 1500).toString().split(".")[0];
    }

    renderText = (i) => {
        return `you have pay successfully the ${this.randomSalary()} for ${this.randomText(i)}`;
    }

    renderListNofitication = (i) => {
        return <ListItem
            title='building one'
            subtitle={
                <View style={styles.subtitleView}>
                    <Text>{this.renderText(i)}</Text>
                </View>
            }
            avatar={
                <Avatar
                large
                rounded
                icon={{name: 'envelope', type: 'font-awesome'}}
                />
            }
        />
    }

    createRange = (range) => {
        const res = [];
        for(let i = 0 ; i < range; i++) res.push(i);
        return res;
    }

    renderNotifications = () => {
        return (
            <View>
                <List>
                    <ScrollView>
                    {this.createRange(15).map(i => {
                        return this.renderListNofitication(i);
                    })}
                    </ScrollView>
                </List>
                
            </View>
        );
    }

    render() {
        return <View>
            {this.renderNotifications()}
        </View>
    }
}



const styles = StyleSheet.create({
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
        flex: 1,
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
