import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Octicons';



export default class RegistrationPage extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      key: null
    };
  }
  
  onRegister = async () => {
    const { username, email, password1, password2 } = this.state;
    await fetch('https://pestoapp.herokuapp.com/api-auth/registration/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log("Response",responseJson)
      this.state.key = responseJson.key;
      if(responseJson.key==undefined){
        alert('Invalid Credentials. Please enter a valid Username and Email. Password should contain at least 8 digits both letter and numeric. ')
      }
    })
    .catch((error) => {
      console.error(error);
    })
    console.log("key",this.state.key)
    try {
      await AsyncStorage.setItem('@MySuperStore:key', this.state.key);
    } catch (error) {
      console.log("Error saving data" + error);
    }   
    try {
      await AsyncStorage.setItem('@MySuperStore:username', this.state.username);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  return this.state.key
}

 

  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pineza</Text>
            <Text style={styles.registration}>Registration</Text>
            <View style={styles.iconsStyle}>
                <Text>
                    <Icon name={"user-secret"}  size={35} color="#666666"/><Text>    </Text>
                    <Icon name={"long-arrow-right"}  size={30} color="#888888" /><Text>    </Text>
                    <Icon2 name={"pin"}  size={35} color="#dd0000" /><Text>    </Text>
                    <Icon name={"long-arrow-right"}  size={30} color="#888888" /><Text>    </Text>
                    <Icon name={"users"}  size={45} color="#99004d" />
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
                value={this.state.Email}
                onChangeText={(email) => this.setState({ email })}
                placeholder={'Email'}
                style={styles.input}
                placeholderTextColor={'#aaaaaa'}
                underlineColorAndroid={'#aaaaaa'}

            />
            <TextInput
                value={this.state.password1}
                onChangeText={(password1) => this.setState({ password1 })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor={'#aaaaaa'}
                underlineColorAndroid={'#aaaaaa'}

            />

            <TextInput
                value={this.state.password2}
                onChangeText={(password2) => this.setState({ password2 })}
                placeholder={'Retype Password'}
                secureTextEntry={true}
                style={styles.input}
                placeholderTextColor={'#aaaaaa'}
                underlineColorAndroid={'#aaaaaa'}

            />
            
            <Button
                title={'Register'}
                onPress={async ()=> { const res = await this.onRegister(); if(res != null) {this.props.navigation.navigate('HomePage')} }}
              
                color={'#008080'}
            />
        </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title:{
      fontSize: 50,
      padding:10,
    //   color: '#00ff99',
    color: '#99004d'
  },
  registration:{
    fontSize: 20,
    padding:10,
  //   color: '#00ff99',
    color: '#99004d'
    },
  input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 0,
    marginBottom: 10,
    color: '#99004d',

  },
  iconsStyle: {
      padding:30
  }
});

