import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl
} from 'react-native';
import { CheckBox, List, ListItem, FlatList, Avatar, Button} from 'react-native-elements'
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { BACKEND } from '../constants/Backend';

const buildingImage = require('../assets/images/contract.jpg');

class User {
    name;
    age;

    constructor(name, age) {this.age = age, this.name = name;}
}
export default class ContractScreen extends React.Component {
    static navigationOptions = {
        title : "BuildingScreen"
    };

    constructor(props) {
        super(props);
        this.state = { buildingChecked: true, contractChecked: true, contract : {}, building: {} };
        this.update();
        
    }

    async update() {
        await BACKEND.UPDATE();
        
        BACKEND.CONTRACTS.map(contract => {
            if (contract.id == this.props.navigation.getParam('id')) {
                this.state.contract = contract;
            }
        })

        this.state.building = await this.getBuilding(this.state.contract.building.id);
        this.setState({refreshing: false, contract: this.state.contract, building: this.state.building});
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.update();
    }


    getBuilding = async  (contractId) => {
        console.log("get building for contract " + `${BACKEND.B_ID}${contractId}`);
        let res = await fetch(`${BACKEND.B_ID}${contractId}`);
        res = await res.json();
        return await res[0];
    }

    renderBuyer() {
        if (this.state.contract.buyer)
            return (
                <View style={[styles.user, {}]}>
                    <Text style={styles.type} fontSize="30">Buyer</Text>
                    <View style={styles.info}>
                        <Text fontSize="8">{this.contract.buyer.name}</Text>
                    </View>
                    {(this.contract.approvedByBuyer == true) ? 
                        <Text style={[styles.verified, {color: "green"}]}>Accepted</Text> : 
                        <Text style={[styles.verified ,{color: "red"}]}>Not Accepted</Text>}
                    
                </View>
            );
    }

    renderSeller() {
        if (this.state.contract && this.state.building){
            let owner = this.state.building.owner;
            return (
                <View style={[styles.user, {}]}>
                    <Text style={styles.type}>Seller</Text>
                    <View style={styles.info}>
                        <Text fontSize="8">{owner.name}</Text>
                    </View>
                    {(this.contract.approvedBySeller == true) ? 
                        <Text style={[styles.verified, {color: "green"}]}>Accepted</Text> : 
                        <Text style={[styles.verified,{color: "red"}]}>Not Accepted</Text>}
                </View>
            );
        }
    }

    renderGovernmentStatus() {
        this.contract = this.state.contract;
        return (
            <View style={[styles.user, {}]}>
                <Text style={[styles.type, {fontSize: 12}]}>Government</Text>
                <View style={styles.info}>
                    <Text></Text>
                </View>
              {(this.contract.approvedByGovernment == true) ? 
                    <Text style={[styles.verified, {color: "green"}]}>Accepted</Text> : 
                    <Text style={[styles.verified,{color: "red"}]}>Not Accepted</Text>}
            </View>
        );
    }

    renderBuildingInfo() {
        if(this.state.building) {
            return (
                <View>
                    <View style={[styles.user, {}]}>
                        <View style={[styles.type, {fontSize: 12}]}>
                            <Text >Building</Text>
                            <Text >Info</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3}]}>
                            <Text style={{fontSize: 15}}>Area {this.state.building.area}</Text>
                            <Text style={{fontSize: 15}}>City {this.state.building.city}</Text>
                            <Text style={{fontSize: 15}}>Address {this.state.building.address}</Text>
                            <Text style={{fontSize: 15}}>Level {this.state.building.level}</Text>
                            
                            <Text></Text>
                            <Text style={{fontSize: 15}}>{(this.state.building.isFurnitured) ? 'The building have furniture': 'There is no furniture'}</Text>
                            <Text style={{fontSize: 15}}>N.Room {this.state.building.numberOfRooms}</Text>
                            <Text style={{fontSize: 15}}>N.Bathroom {this.state.building.numberOfBathrooms}</Text>
                        </View>
                    </View>

                    <View style={[styles.user, {}]}>
                        <View style={[styles.type, {fontSize: 12}]}>
                            <Text >Electricity</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3}]}>
                            <Text fontSize="8">Total Read: {this.state.building.electricityTotalReader} kW</Text>
                            <Text fontSize="8">Current Read: {this.state.building.electricityMonthReader} kW</Text>
                            <Text fontSize="8">Amount to be pay: {this.state.building.electricityTotalToPay} EGP</Text>
                        </View>
                    </View>

                    <View style={[styles.user, {}]}>
                        <View style={[styles.type, {fontSize: 12}]}>
                            <Text >Gas</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3}]}>
                            <Text fontSize="8">Total Read: {this.state.building.gasTotalReader} m3</Text>
                            <Text fontSize="8">Current Read: {this.state.building.gasMonthReader} m3</Text>
                            <Text fontSize="8">Amount to be pay: {this.state.building.gasTotalToPay} EGP</Text>
                        </View>
                    </View>

                    <View style={[styles.user, {}]}>
                        <View style={[styles.type, {fontSize: 12}]}>
                            <Text >Water</Text>
                        </View>
                        
                        <View style={[styles.info, {width: width/4 * 3}]}>
                            <Text fontSize="8">Total Read: {this.state.building.waterTotalReader} m3</Text>
                            <Text fontSize="8">Current Read: {this.state.building.waterMonthReader} m3</Text>
                            <Text fontSize="8">Amount to be pay: {this.state.building.waterTotalToPay} EGP</Text>
                        </View>
                    </View>
                    
                </View>
            );
        }
    }

    renderBuildingCondition() {
        return (<View style={{padding: 20}}>
            <Text>By accepting the condition</Text>
            <Text style={{fontSize: 15}}>Buyer</Text>
            <Text>- you accept to pay the money</Text>
            <Text style={{fontSize: 15}}></Text>
            <Text style={{fontSize: 15}}>Seller</Text>
            <Text>- you accept to pay to the government Water</Text>
            <Text>- you accept to pay to the government Gas</Text>
            <Text>- you accept to pay to the government Electricity</Text>
            <Text>- you accept to transfer the builing owenrship</Text>
        </View>)
    }

    buy = () => {
        this.state.contract.buyerId = BACKEND.OWNER.id;
        this.state.contract.approvedByBuyer = 1;
        this.state.contract.hasAbuyer = 1;
        let i = 0;
        BACKEND.updateContract(this.state.contract);

        fetch(`${BACKEND.CONTRACT}/${this.state.contract.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.contract)
        }).then(() => {
            this.props.navigation.navigate("Search");
        }).catch (() => {
            Alert.alert("Some thing wrong");
        });
    }

    reject = () => {
        this.state.contract.buyerId = null;
        this.state.contract.hasAbuyer = "0";
        fetch(`${BACKEND.CONTRACT}/${this.state.contract.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.contract)
        }).then(() => {
            BACKEND.updateContract(this.state.contract);
            this.props.navigation.navigate("Home");
        }).catch (() => {
            Alert.alert("Some thing wrong");
        });
    }

    acceptBuy = () => {
        this.state.contract.approvedBySeller = 1;
        this.state.contract.status = "Sold";
        this.state.contract.hasAbuyer = "0";

        fetch(`${BACKEND.CONTRACT}/${this.state.contract.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.contract)
        }).then(() => {
            BACKEND.updateContract(this.state.contract);
            this.state.building.ownerId = this.state.contract.buyerId;
            fetch(`${BACKEND.BUILDING}/${this.state.building.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.building)
            }).then(() => {
                this.props.navigation.navigate("Home");
            }).catch (() => {
                Alert.alert("Some thing wrong");
            });
        }).catch (() => {
            Alert.alert("Some thing wrong");
        });
    }

    renderOptional = () => {
        
        if(this.state.building.owner.id == BACKEND.OWNER.id) {
            if (this.state.contract.hasAbuyer && this.state.contract.hasAbuyer != 0 && this.state.contract.status === "On Sale") 
                return <View>
                    <TouchableOpacity
                        onPress = {this.acceptBuy}
                        style= {{borderColor:"#0062cc", borderRadius: 10, borderWidth: 3, padding: 10, backgroundColor: "white"}}
                        underlayColor='#fff'>
                        <Text style={{color: "#0062cc", fontSize: 20}}>Accept</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity
                        style= {{borderColor:"#0062cc", borderRadius: 10, borderWidth: 3, padding: 10, backgroundColor: "white"}}
                        underlayColor='#fff'
                        onPress={this.reject}
                        >
                        <Text style={{color: "#0062cc", fontSize: 20}}>Reject</Text>
                    </TouchableOpacity>  
                </View>
        }else {
            if (this.state.contract.hasAbuyer == 1) {
                return <View></View>
            }
            return <TouchableOpacity
                onPress = {this.buy}
                style= {{borderColor:"#0062cc", borderRadius: 10, borderWidth: 3, padding: 10, backgroundColor: "white"}}
                underlayColor='#fff'>
                <Text style={{color: "#0062cc", fontSize: 20}}>Buy</Text>
            </TouchableOpacity>
        }
    }

    render() {
        console.log(this.state.building, this.state.contract)
        if(!this.state.contract || !this.state.contract.building || !this.state.building) {
            return <View></View>
        }else {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
                >
                    <Image
                        style={styles.logo}
                        source={buildingImage}
                    />
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{this.state.contract.building.address}</Text>
                        {this.renderOptional()}
                        
                    </View>

                    <View>
                        {this.renderGovernmentStatus()}
                        {this.renderBuyer()}
                        {this.renderSeller()}
                    </View>

                    {this.renderBuildingInfo()}
                    {this.renderBuildingCondition()}
                </ScrollView>
            </View>
        );
        }
    }
}

var width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    type: {
        padding: 15,
        width: width/4,
    },
    info: {
        padding: 15,
        width: width/4,
        borderLeftWidth: 1,
        borderLeftColor: "black"
    },
    verified: {
        padding: 15,
        width: width/4 * 2
    },
    user: {
        padding: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    Etitle: {
        paddingLeft: 15,
        width: width/4, 
    },
    Econtent: {
        width: width/4 * 3, 
        borderLeftWidth: 1,
        paddingLeft: 10,
        borderLeftColor: "black"
    },
    electricity: {
        paddingTop: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
        marginBottom: 10
    },
    
    headerBtn: {
        textAlign: 'center',
        width: width/3, 
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 55
    },
    headerText: {
        textAlign: 'left',
        fontSize: 30,
        paddingLeft: 15,
        width: width/3 + width/3, 
        height: 50,
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    header: {
        paddingTop: 15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1, 
        flexDirection: 'row'
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
    logo: {
        marginTop: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: 400,
    },
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
