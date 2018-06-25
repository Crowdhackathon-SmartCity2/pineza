import React, { Component } from 'react';
import { Container, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
import  {View, StyleSheet, Dimensions, Button, AsyncStorage} from 'react-native';
import Modal from "react-native-modal";
var {height, width}=Dimensions.get('window');


export default class SettingsPage extends Component {
    static navigationOptions = {
        title: 'Settings',
        headerTintColor: '#FFFFFF',
        headerTitleStyle:{ color:'#FFFFFF' },
        headerStyle:{ backgroundColor:'#33001a' },
      };

      state = {
        isModalVisible: false,
        key1: "",
        username: ""
      };
    
      _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });


     componentDidMount() {
       AsyncStorage.getItem('@MySuperStore:key').then((token) => {
         this.setState({key1 : token})})
       AsyncStorage.getItem('@MySuperStore:username').then((token) => {
        this.setState({username : token})})
      }
       onLogout = async () => {
        await fetch('http://192.168.2.6:8000/api-auth/logout/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
     },
    body: JSON.stringify({
    token: this.state.key1,
  })
}).then((response) => response.json())
.then((responseJson) => {
  console.log("Response",responseJson)
})
.catch((error) => {
  console.error(error);
})
  this.props.navigation.navigate('LoginPage') 
    }
    
  
    render() {
      return (
        <Container>
          <SettingsList username={this.state.username} key1={this.state.key1} info={this._toggleModal} onLogout={this.onLogout} />

            <Modal 
            isVisible={this.state.isModalVisible}
            backdropColor={'#222222'}
            backdropOpacity={0.8}
            onBackButtonPress={this._toggleModal}
            style={styles.infoModal}
            >
              <View style={styles.infoView}>
                <Text style={{color: '#33ffff', padding:20, textAlign: 'center', fontSize:20}}>Pineza 101..</Text>
                <Text style={{color: '#33ffff', padding:20, textAlign: 'center'}} > 
     
                There's a lady who's sure
                All that glitters is gold
                And she's buying a stairway to heaven
                When she gets there she knows
                If the stores are all closed
                With a word she can get what she came for
                Oh oh oh oh and she's buying a stairway to heaven{'\n'} {'\n'} 
                
                There's a sign on the wall
                But she wants to be sure
                'Cause you know sometimes words have two meanings
                In a tree by the brook
                There's a songbird who sings
                Sometimes all of our thoughts are misgiving</Text>
                <Button color={"#b30059"} onPress={this._toggleModal} title={'Hide'} />
              </View>
            </Modal>
        </Container>
    );
  }
}

class SettingsList extends Component {
  
  render(){
    return(
      <Content >
          <List>
            <ListItem icon>
              <Left>
                <Icon type="FontAwesome" name="exclamation" />
              </Left>
              <Body>
                <Text>Notifications</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon type="FontAwesome"  name="street-view" />
              </Left>
              <Body>
                <Text>Radius of Interest</Text>
              </Body>
              <Right>
                <Text>2.0 Km</Text>
               {/* <Icon name="arrow-forward" /> */}
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon type="FontAwesome" name="globe" />
              </Left>
              <Body>
                <Text>Language</Text>
              </Body>
              <Right>
                <Text>En</Text>
              </Right>
            </ListItem>

            <ListItem icon onPress={()=>{this.props.info()}}>
              <Left>
                <Icon type="FontAwesome" name="info" />
              </Left>
              <Body>
                <Text>How to Use</Text>
              </Body>
              <Right>
                <Text></Text>
                {/* <Icon name="arrow-forward" /> */}
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon type="FontAwesome" name="user"/>
              </Left>
              <Body>
                <Text>Username</Text>
              </Body>
              <Right>
                <Text>{this.props.username}</Text>
              </Right>
            </ListItem>

            <ListItem icon>
              <Left>
                <Icon type="FontAwesome" name="key"/>
              </Left>
              <Body>
                <Text>Key</Text>
              </Body>
              <Right>
              <Text style={{fontSize:10}}>{this.props.key1}</Text>
            </Right>
            </ListItem>

            <ListItem icon onPress={()=>{this.props.onLogout()}}>
              <Left>
                <Icon type="FontAwesome" name="sign-out" />
              </Left>
              <Body>
                <Text>Sign-Out</Text>
              </Body>
            </ListItem>
      
          </List>
        </Content>
    )
  }
}

const styles = StyleSheet.create({
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