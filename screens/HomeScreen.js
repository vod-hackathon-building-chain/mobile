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
import { CheckBox, List, ListItem, FlatList, Avatar} from 'react-native-elements'
import { Dimensions } from "react-native";
import { BACKEND } from '../constants/Backend';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title : "Home Screen"
    };


    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true , building: []};
        this.navigation = this.props.navigation;
        this.getBuilding();
        this.getContract();
    }

    getContract = async() => {
        let res = await fetch(`${BACKEND.CONTRACT}`);
        res = await res.json();
        BACKEND.CONTRACTS = res;
        let array = [];
        res.map(contract => {
            if (contract.building.ownerId === BACKEND.OWNER.id) {
                array.push(contract);
            }
        })
        this.setState({contract: array});
    }

    getBuilding = async () => {
        let res = await fetch(`${BACKEND.BUILDING}/${BACKEND.OWNER.id}`);
        res = await res.json();
        
        let array = [];
        
        res.map(object => {
            BACKEND.BUILDINGS.push(object);
            array.push({
                address: object["address"],    
                area: object["area"],
                city: object["city"],
                level: object["level"],
                id: object["id"]
            })
        })
        this.setState({building: array});
    }

    renderBuilding = () => {
        if (this.state.buildingChecked && this.state.building)
            return (                
                <View>
                    <Text style={styles.titleText}>Building</Text>
                    <List>
                        {this.state.building.map(building => {
                            return <ListItem
                                onPress={() => this.navigation.navigate("Building", {
                                    id: building.id
                                })}
                                key={building.id}
                                title={`${building.address}`}
                                subtitle={
                                    <View style={styles.subtitleView}>
                                        <Text style={styles.ratingText}>City: {building.city}</Text>
                                        <Text style={styles.ratingText}>Area: {building.area} M2</Text>
                                        <Text style={styles.ratingText}>Floor: {building.level}</Text>
                                    </View>
                                }
                                avatar={
                                    <Avatar
                                    large
                                    rounded
                                    icon={{name: 'home', type: 'font-awesome'}}
                                    />
                                }
                            />
                        })}
                    </List>
                </View>
            );
    }

    renderContract = () => {
        let res = []
        if (this.state.contractChecked && this.state.contract){
            this.state.contract.map(contract => {
                res.push(contract);
            })
        }
        return (
            <View>
                <Text style={styles.titleText}>Contract</Text>
                <List>
                    {res.map(contract => {
                        return <ListItem
                            key={contract.id}
                            title = {contract.building.address}
                            onPress={() => this.navigation.navigate("Contract", {id: contract.id})}
                            subtitle={
                                <View style={styles.subtitleView}>
                                    <View><Text style={styles.ratingText}>Status: {contract.status}</Text></View>
                                    <View><Text style={styles.ratingText}>Price: {contract.price}</Text></View>
                                </View>
                            }
                            avatar={
                                <Avatar
                                large
                                rounded
                                icon={{name: 'building', type: 'font-awesome'}}/>
                            }
                        />
                    })}
                </List>
            </View>
        );
    }

    render() {
        return (
            
            <View style={{height: height}}>
                <View style={{height: 70}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: width/2}} >
                            <CheckBox
                                style={styles.checkbox}
                                center
                                title='Building'
                                checked={this.state.buildingChecked}
                                onPress={() => this.setState({buildingChecked : !this.state.buildingChecked})}
                            />
                        </View>
                        <View style={{width: width/2}} >
                            <CheckBox
                                style={styles.checkbox}
                                center
                                title='Contract'
                                checked={this.state.contractChecked}
                                onPress={() => this.setState({contractChecked : !this.state.contractChecked})}
                            />
                        </View>
                    </View>
                </View>
                <ScrollView style={{}}>
                    {this.renderBuilding()}
                    <View style={styles.line}></View>
                    {this.renderContract()}
                    
                </ScrollView>     
                {
                    Platform.OS === 'ios'
                    ? <View style={{height: 170}}></View>
                    : <View style={{height: 125}}></View>
                }
                
            </View>
        );
    }
}

var height = Dimensions.get('window').height; //full width
var width = Dimensions.get('window').width; //full width

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
        backgroundColor: '#fff'
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    checkbox: {
        width: '50%',
    },
    checkBoxContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 10
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
