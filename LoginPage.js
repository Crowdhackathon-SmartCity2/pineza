import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Octicons';



export default class LoginPage extends Component {
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
                    <Icon2 name={"pin"}  size={35} color="#dd0000" /><Text>    </Text>
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
                onPress={()=> {this.props.navigation.navigate('HomePage')}}
                color={'#b30059'}
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
    color: '#33ffff',

  },
  iconsStyle: {
      padding:30
  }
});

