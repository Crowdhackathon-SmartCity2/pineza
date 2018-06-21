'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image
  } from 'react-native';
  
  import SettingsList from 'react-native-settings-list';
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

  
  
 export default class SettingsPage extends Component {
    static navigationOptions = {
        title: 'Settings',
        headerTintColor: '#FFFFFF',
        headerTitleStyle:{ color:'#FFFFFF' },
        headerStyle:{ backgroundColor:'#232323' },
      };

    constructor(){
      super();
    }
    render() {
      return (
        <View>
            <SettingsList>
                <SettingsList.Item 
                 title={'Notifications'}
                 titleStyle={styles.TextStyle}
                 icon = {<Icon type="FontAwesome" name="exclamation" size={32} style={styles.IconStyle}/>}
                 />
                 <SettingsList.Item 
                 title={'TEST'}
                 titleStyle={styles.TextStyle}
                 icon = {<Icon type="FontAwesome" name="map-signs" size={32} style={styles.IconStyle}/>}
                 />
                 <SettingsList.Item 
                 title={'TEST'}
                 titleStyle={styles.TextStyle}
                 icon = {<Icon type="FontAwesome" name="street-view" size={32} style={styles.IconStyle}/>}
                 />
                 <SettingsList.Item 
                 title={'TEST'}
                 titleStyle={styles.TextStyle}
                 icon = {<Icon type="FontAwesome" name="globe" size={32} style={styles.IconStyle}/>}
                 />
                 <SettingsList.Item 
                 title={'TEST'}
                 titleStyle={styles.TextStyle}
                 icon = {<Icon type="FontAwesome" name="info" size={32} style={styles.IconStyle}/>}
                 />
                 <SettingsList.Item 
                 title={'TEST'}
                 titleStyle={styles.TextStyle}
                 icon = {<Icon type="FontAwesome" name="sign-out" size={32} style={styles.IconStyle}/>}
                 />

            </SettingsList>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    TextStyle:{
        color: 'red'
    },
    imageStyle:{
        marginLeft:15,
        marginRight:20,
        alignSelf:'center',
        width:20,
        height:24,
        justifyContent:'center'
    },
    IconStyle:{
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10
    }
  });
  