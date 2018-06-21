import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
  AppRegistry,
  TextInput,
  Button
} from 'react-native';
import { Container, Header, Content } from 'native-base';
import { StackNavigator, createStackNavigator } from 'react-navigation'; 
import ReportPage from './ReportPage';
import SettingsPage from './SettingsPage';
import LiveMaps from './LiveMaps';
import CircleButton from 'react-native-circle-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import feltUncomfortable from './feltUncomfortable';



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

class HomePage extends Component {

  
  static navigationOptions = { header: null };
  render () {
    return (
      <View style={styles.HomeStyle}  >

      <StatusBar hidden={true}/> 

        <HomePageRow style={styles.HomePageIncident} textStyle1={[styles.StyleText1, {color: '#FFFFFF'}]} 
        textStyle2={[styles.StyleText2, {color: '#FFFFFF'}]} text1={INCIDENT_1} text2={INCIDENT_2} text3={INCIDENT_3} onPress={() =>this.props.navigation.navigate('ReportPage')}/>
        <HomePageRow style={styles.HomePageLive} textStyle1={[styles.StyleText1, {color: '#000000'}]} 
        textStyle2={[styles.StyleText2, {color: '#000000'}]} text1={LIVE_1} text2={LIVE_2} text3={LIVE_3} onPress={() =>this.props.navigation.navigate('LiveMaps')} />
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
      // <View style={{ position:'absolute', alignSelf:'center', height:'100%'}}>
      //     <CircleButton 
      //     size={45} 
      //     primaryColor='#222222' 
      //     secondaryColor='#aaaaaa'
      //     onPressButtonBottom = {this.props.SettingsButton}
      //     />
      // </View>
      <View style={buttonStyles.CircleContainer}>
        <View style={buttonStyles.Circle}>
          <TouchableOpacity activeOpacity={0.4} onPress={this.props.SettingsButton} style={buttonStyles.CircleContainer}>
          <Icon name={"cog"}  size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
        
      );
  }
}



class LoginPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }



  render() {

    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pineza</Text>
            <View style={styles.iconsStyle}>
                <Text>
                    <Icon name={"user-secret"}  size={35} color="#dddddd"/><Text>    </Text>
                    <Icon name={"long-arrow-right"}  size={30} color="#888888" /><Text>    </Text>
                    <Icon name={"thumb-tack"}  size={35} color="#dd0000" /><Text>    </Text>
                    <Icon name={"long-arrow-right"}  size={30} color="#888888" /><Text>    </Text>
                    <Icon name={"users"}  size={45} color="#33ffff" />
                </Text>
            </View>

            <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                style={styles.input}
                placeholderTextColor={'#aaaaaa'}
                underlineColorAndroid={'#aaaaaa'}

            />
            <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor={'#aaaaaa'}
                underlineColorAndroid={'#aaaaaa'}

            />
            
            <Button
                title={'Login'}
                onPress={()=>{this.props.navigation.navigate('HomePage')}}
                color={'#b30059'}
            />
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
    justifyContent: 'center',
    alignItems: 'center',
  },




  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4d0026',
  },
  title:{
      fontSize: 50,
      padding:10,
    //   color: '#00ff99',
    color: '#33ffff'

  },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 0,
    marginBottom: 10,
    color: '#00ff99',

  },
  iconsStyle: {
      padding:30
  }
});

