import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Button,
  TextInput,  
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// Check icons here https://fontawesome.com/v4.7.0/icons/
var {height, width} =Dimensions.get('window');
import Modal from "react-native-modal";

let BUTTON_1 = "Felt Uncomfortable"
let BUTTON_2 = "Theft"
let BUTTON_3 = "Robbery"
let BUTTON_4 = "Other"

class ReportPageRow extends Component {
    render() {
      return (
        <TouchableWithoutFeedback onPress={this.props.onPress} >
        <View style={this.props.style}>
        <Text>
        <Text>    </Text>
        <Icon name={this.props.name} size={25} color={this.props.iconColor} />
        <Text>    </Text>
        <Text style={this.props.textStyle}>{this.props.text}</Text>
        </Text>
        </View>
        </TouchableWithoutFeedback>
      );
    }
  }
  
export default class ReportPage extends Component {
    static navigationOptions = {
    title: 'What happend?',
    headerTintColor: '#FFFFFF',
    headerTitleStyle:{ color:'#FFFFFF' },
    headerStyle:{ backgroundColor:'#33001a' },
  };

  state = {
    isModalVisible: false,
    info: null,
    incidentType: null
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleModal1 = async () =>{
    try {
      await AsyncStorage.setItem('@MySuperStore:category', 'Felt Uncomfortable');
      // await AsyncStorage.setItem('@MySuperStore:info', this.state.info);
    } catch (error) {
      console.log("Error saving data" + error);
    } 
    this.state.incidentType = 'Felt Uncomfortable';
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('feltUncomfortable')
  }

  _toggleModal2 = async () =>{
    try {
      await AsyncStorage.setItem('@MySuperStore:category', 'Theft');
      // await AsyncStorage.setItem('@MySuperStore:info', this.state.info);
    } catch (error) {
      console.log("Error saving data" + error);
    } 
    this.state.incidentType = 'Theft';
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('feltUncomfortable')
  }

  _toggleModal3 = async () =>{
    try {
      await AsyncStorage.setItem('@MySuperStore:category', 'Robbery');
      // await AsyncStorage.setItem('@MySuperStore:info', this.state.info);
    } catch (error) {
      console.log("Error saving data" + error);
    }
    this.state.incidentType = 'Robbery';
    // this.setState({ isModalVisible: !this.state.isModalVisible });
    this.props.navigation.navigate('feltUncomfortable')
  }

  _toggleModal4 = async () =>{
    try {
      await AsyncStorage.setItem('@MySuperStore:category', 'Other');
    } catch (error) {
      console.log("Error saving data" + error);
    }
    this.state.incidentType = 'Other';
    this.setState({ isModalVisible: !this.state.isModalVisible });
    // this.props.navigation.navigate('feltUncomfortable')
  }

    render () {
      return (
        <View style={styles.ReportStyle}>
          <ReportPageRow style={styles.FeltUncomfortable} textStyle={styles.StyleText1} text={BUTTON_1} name="frown-o" iconColor="#222222" onPress={this._toggleModal1} />
          <ReportPageRow style={styles.Theft} textStyle={styles.StyleText1} text={BUTTON_2} name="hand-lizard-o" iconColor="#222222" onPress={this._toggleModal2} />
          <ReportPageRow style={styles.Robbery} textStyle={styles.StyleText2} text={BUTTON_3} name="user-secret" iconColor="#eeeeee" onPress={this._toggleModal3} />
          <ReportPageRow style={styles.Other} textStyle={styles.StyleText2} text={BUTTON_4} name="commenting-o" iconColor="#eeeeee" onPress={this._toggleModal4} />

          <Modal 
          isVisible={this.state.isModalVisible}
          backdropColor={'#222222'}
          backdropOpacity={0.8}
          onBackButtonPress={this._toggleModal}
          style={styles.infoModal}
          >
            <View style={styles.infoView}>
              <Text style={{color: '#aaaaaa', textAlign: 'center', fontSize:20}}>({this.state.incidentType})</Text>
              <Text style={{color: '#33ffff', paddingBottom:30, textAlign: 'center', fontSize:23}}>Describe the Incident</Text>
              <TextInput style={{
                color: '#aaaaaa',
                fontSize:18, 
                textAlign: 'center',
              }} 
              onChangeText={ (e) => {this.state.info=e} }
              autoFocus={true}
              />
              <Button color={"#b30059"} title={'Next'} onPress={async () =>{
                try {
                  await AsyncStorage.setItem('@MySuperStore:info', this.state.info);
                } 
                catch (error) {
                  console.log("Error saving data" + error);
                }
                this._toggleModal(); 
                this.props.navigation.navigate('feltUncomfortable');
              }}/>
            </View>
          </Modal>
        </View> 
      )
    }
  }

  const styles = StyleSheet.create({
    ReportStyle: {
      flexDirection: 'column', 
      flex:1, 
      justifyContent: 'space-evenly'
    },
    StyleText1: {
      color:'#222222', 
      fontSize:24,
      textAlign: 'center'
    },
    StyleText2: {
      color:'#eeeeee', 
      fontSize:24,
      textAlign: 'center'
    },
    FeltUncomfortable: {
      flex:1,
      backgroundColor: '#ffcce6' ,
      justifyContent: 'center',
      // alignItems: 'center',
    },
    Theft: {
      flex:1,
      backgroundColor: '#ff99cc',
      justifyContent: 'center',
      // alignItems: 'center',
    },
    Robbery: {
      flex:1,
      backgroundColor: '#b30059',
      justifyContent: 'center',
      // alignItems: 'center',
    },
    Other: {
      flex:1,
      backgroundColor: '#444444',
      justifyContent: 'center',
      // alignItems: 'center',
    },
    infoModal:{
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: width*0.9,
      height: height*0.8,
      backgroundColor: '#33001a',
      borderRadius: 20,
      opacity: 0.75
    }
  
  });

