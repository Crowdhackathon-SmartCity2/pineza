import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Octicons';



export default class LoginPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      email: '',
      password: '',
      key: null
    };
  }

  componentDidMount() {   
    AsyncStorage.getItem('@MySuperStore:key').then((token) => {
    this.setState({key : token})
    })
    console.log(this.state.key)
    if (this.state.key!=undefined){
      this.props.navigation.navigate('HomePage')
    }
  }
  
  onLogin = async () => {
    const { username, email, password } = this.state;
    await fetch('https://pestoapp.herokuapp.com/api-auth/login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response",responseJson)
      this.state.key = responseJson.key;
      if(responseJson.key==undefined){
        alert('Invalid username or password')
      }
    })
    .catch((error) => {
      console.error("Error", error);
    })
    console.log("key",this.state.key)
    try {
      await AsyncStorage.setItem('@MySuperStore:key', this.state.key);
    } catch (error) {
      console.log("Error saving data" + error);
    }   
    try {
      await AsyncStorage.setItem('@MySuperStore:email', this.state.email);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  return this.state.key
}

 

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pineza</Text>
            <View style={styles.iconsStyle}>
                <Text>
                    <Icon name={"user-secret"}  size={35} color="#dddddd"/><Text>    </Text>
                    <Icon name={"long-arrow-right"}  size={30} color="#888888" /><Text>    </Text>
                    <Icon2 name={"pin"}  size={35} color="#dd0000" /><Text>    </Text>
                    <Icon name={"long-arrow-right"}  size={30} color="#888888" /><Text>    </Text>
                    <Icon name={"users"}  size={45} color="#33ffff" />
                </Text>
            </View>

            <TextInput
                value={this.state.Email}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email'}
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

            <Button
                title={'Register'}
                onPress={()=> {this.props.navigation.navigate('RegistrationPage') }}
                color={'#008080'}
            />
            <Text>         </Text>
            <Button
                title={'Login'}
                onPress={async ()=> { const res = await this.onLogin(); if(res != null) {this.props.navigation.navigate('HomePage')} }}
                color={'#b30059'}
            />
            
            </View>
          
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#33001a',
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
    color: '#33ffff',

  },
  iconsStyle: {
      padding:30
  }
});

