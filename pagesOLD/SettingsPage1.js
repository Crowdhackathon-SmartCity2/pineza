import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AppRegistry
} from 'react-native';
import { StackNavigator } from 'react-navigation'; 
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-elements';
// Check icons here https://fontawesome.com/v4.7.0/icons/

// WE NEED TO MAKE CHANGES TO ALGN BETTER THE COMPONENTS

let BUTTON_1 = "Notifications"
let BUTTON_2 = "Radius of Interest"
let BUTTON_3 = "How to Use"
let BUTTON_4 = "Language"
let BUTTON_5 = "Log out"



class SettingsRow extends Component {
    render() {
      return (
        // <TouchableWithoutFeedback onPress={this.props.onPress} >
        // <View style={this.props.style}>
        // <Text>
        // <Icon name={this.props.name} size={25} color={this.props.iconColor}/>
        // <Text>   </Text>  
        // <Text style={this.props.textStyle}>{this.props.text}</Text>
        // </Text>
        // </View>
        // </TouchableWithoutFeedback>
        <View>
        <Text>
        <Icon active name={this.props.name} size={20} style={{textAlign: 'center'}}/>
        <Text>sdadasddds</Text>
        </Text>
        </View>
      );
    }
  }


  
export default class SettingsPage extends Component {
    static navigationOptions = {
    title: 'Settings',
    headerTintColor: '#FFFFFF',
    headerTitleStyle:{ color:'#FFFFFF' },
    headerStyle:{ backgroundColor:'#232323' },
  };
    render () {
    //   const { navigate } = this.props.navigation;
      return (
        <View style={styles.SettingsStyle}>
        
          <SettingsRow style={styles.RowEven} textStyle={styles.StyleText1} text={BUTTON_1} name="bell" iconColor="#000000" />
          <SettingsRow style={styles.RowOdd} textStyle={styles.StyleText1} text={BUTTON_2} name="map-marker" iconColor="#000000" />
          <SettingsRow style={styles.RowEven} textStyle={styles.StyleText1} text={BUTTON_3} name="info" iconColor="#000000" />
          <SettingsRow style={styles.RowOdd} textStyle={styles.StyleText1} text={BUTTON_4} name="globe" iconColor="#000000" />
          <SettingsRow style={styles.RowEven} textStyle={styles.StyleText1} text={BUTTON_5} name="sign-out" iconColor="#000000" />
        </View>
     
        
      )
    }
  }
  

  const styles = StyleSheet.create({
    SettingsStyle: {
      flexDirection: 'column', 
      flex:1, 
      justifyContent: 'space-evenly',
    },
    StyleText1: {
      color:'#000000', 
      fontSize:18,
      textAlign: 'center',
    },
    StyleText2: {
      color:'#000000', 
      fontSize:18,
      textAlign: 'center'
    },
    RowEven: {
      flex:1,
      flexDirection: 'row',
      backgroundColor: '#FFFFFF' ,
      alignItems: 'center',
      padding: 15 //This should be modifyied

    },
    RowOdd: {
      flex:1,
      flexDirection: 'row',
      backgroundColor: '#cccccc',
    //   justifyContent: 'space-around', 
    alignItems: 'center',
    padding: 15


    },
  });