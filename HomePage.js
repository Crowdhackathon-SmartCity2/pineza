import React, { Component } from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import SettingsPage from './SettingsPage';



let INCIDENT_1 = "Tap here to "
let INCIDENT_2 = "Report\n"
let INCIDENT_3 = "          an incident"

let LIVE_1 = "Otherwise tap here for\n"
let LIVE_2 = "LIVE"
let LIVE_3 = " map streaming"

class HomePageRow extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
      <View style={this.props.style}>
      <Text>
      <Text style={this.props.textStyle1}>{this.props.text1}</Text>
      <Text style={this.props.textStyle2}>{this.props.text2}</Text>
      <Text style={this.props.textStyle1}>{this.props.text3}</Text>
      </Text>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      jsona: ''
    };
  }

  _LiveMaps = async () => {
    var a;
    await fetch('https://pestoapp.herokuapp.com/pin/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Token f6618056257d660e3b88eef22c033cd19edf8172'
      },
    })
    .then((response) => response.json())
    .then((response) => {
      console.log("Feedback",response)
      this.state.jsona = JSON.stringify(response)
    })
      try {
        await AsyncStorage.setItem('@MySuperStore:pins', this.state.jsona);
      } catch (error) {
        console.log("Error saving data" + error);
      }  
      this.props.navigation.navigate('LiveMaps')
  }
  
  static navigationOptions = { header: null };
  render () {
    return (
      <View style={styles.HomeStyle}  >

      <StatusBar hidden={true}/> 

        <HomePageRow style={styles.HomePageIncident} textStyle1={[styles.StyleText1, {color: '#FFFFFF'}]} 
        textStyle2={[styles.StyleText2, {color: '#FFFFFF'}]} text1={INCIDENT_1} text2={INCIDENT_2} text3={INCIDENT_3} onPress={() =>this.props.navigation.navigate('ReportPage')}/>
        <HomePageRow style={styles.HomePageLive} textStyle1={[styles.StyleText1, {color: '#000000'}]} 
        textStyle2={[styles.StyleText2, {color: '#000000'}]} text1={LIVE_1} text2={LIVE_2} text3={LIVE_3} onPress={() =>this._LiveMaps()} />
        <Settings SettingsButton={() =>this.props.navigation.navigate('SettingsPage')}/>
      </View>

      
    )
  }
}

class Settings extends Component {

  render() {
    const buttonStyles = StyleSheet.create({
      CircleContainer: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      },
      Circle: {
        backgroundColor: '#444444',
        width: 45,
        height: 45,
        borderRadius: 45/2,
        justifyContent: 'center',
        alignItems: 'center'
      },
    }
  );
    return (
      <View style={buttonStyles.CircleContainer}>
        <View style={buttonStyles.Circle}>
          <TouchableOpacity activeOpacity={0.4} onPress={this.props.SettingsButton} style={buttonStyles.CircleContainer}>
          <Icon name={"pin"}  size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
      );
  }
}


const styles = StyleSheet.create({
  HomeStyle: {
    flexDirection: 'column', 
    flex:1, 
    // justifyContent: 'space-evenly'
  },
  StyleText1: {
    // color:'#ffffff', 
    fontSize:22,
    textAlign: 'center'
  },
  StyleText2: {
    // color:'#ffffff', 
    fontSize:32,
    textAlign: 'center'
  },
  HomePageIncident: {
    flex:1,
    backgroundColor: '#99004d' ,
    // backgroundColor: '#b30047',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomePageLive: {
    flex:1,
    // backgroundColor: '#00ff99',
    backgroundColor: '#1affff',
    // backgroundColor: '#d2ff4d',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

