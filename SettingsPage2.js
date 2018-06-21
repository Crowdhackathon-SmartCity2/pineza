import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AppRegistry,
  ListView
} from 'react-native';
import { StackNavigator } from 'react-navigation'; 
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-elements';
// import Icon from 'react-native-fa-icons';

// Check icons here https://fontawesome.com/v4.7.0/icons/

let BUTTON_1 = "Notifications"
let BUTTON_2 = "Radius of Interest"
let BUTTON_3 = "How to Use"
let BUTTON_4 = "Language"
let BUTTON_5 = "Log out"

let ICON_SIZE = 40



// class SettingsRow extends Component {
//     render() {
//       return (
//         <TouchableWithoutFeedback onPress={this.props.onPress} >
//         <View style={this.props.style}>
//         <Text>
//         <Icon name={this.props.name} size={25} color={this.props.iconColor}/>
//         <Text>   </Text>  
//         <Text style={this.props.textStyle}>{this.props.text}</Text>
//         </Text>
//         </View>
//         </TouchableWithoutFeedback>
//       );
//     }
//   }


  
// export default class SettingsPage extends Component {
//     static navigationOptions = {
//     title: 'Settings',
//     headerTintColor: '#FFFFFF',
//     headerTitleStyle:{ color:'#FFFFFF' },
//     headerStyle:{ backgroundColor:'#232323' },
//   };
//     render () {
//     //   const { navigate } = this.props.navigation;
//       return (
//         <View style={styles.SettingsStyle}>
        
//           <SettingsRow style={styles.RowEven} textStyle={styles.StyleText1} text={BUTTON_1} name="bell" iconColor="#000000" />
//           <SettingsRow style={styles.RowOdd} textStyle={styles.StyleText1} text={BUTTON_2} name="map-marker" iconColor="#000000" />
//           <SettingsRow style={styles.RowEven} textStyle={styles.StyleText1} text={BUTTON_3} name="info" iconColor="#000000" />
//           <SettingsRow style={styles.RowOdd} textStyle={styles.StyleText1} text={BUTTON_4} name="globe" iconColor="#000000" />
//           <SettingsRow style={styles.RowEven} textStyle={styles.StyleText1} text={BUTTON_5} name="sign-out" iconColor="#000000" />
//         </View>
     
        
//       )
//     }
//   }



export default class SettingsPage extends Component {
  //   static navigationOptions = {
  //   title: 'Settings',
  //   headerTintColor: '#FFFFFF',
  //   headerTitleStyle:{ color:'#FFFFFF' },
  //   headerStyle:{ backgroundColor:'#232323' },
  // };
    constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds.cloneWithRows([
          {
            iconName: 'bell',
            title: 'bell'
          },
          {
            iconName: 'map-marker',
            title: 'map'
          },
        ]),
      };
    }

    _renderRow(rowData) {
      return (
        <View style={{borderBottomWidth:1, padding:20, flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Icon name={rowData.iconName} size={40}/>
        </View>
        <View style={{flex: 5}}>
          <Text style={{fontSize:25}}>   {rowData.title}</Text>
        </View>
      </View>
      );
    }
    render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
        />
      );
    }
  }
  

  const styles = StyleSheet.create({
    RenderRowStyle: {
      flexGrow: 1, 
      justifyContent:'space-between', 
      padding:20, 
      borderBottomWidth:1,
    },
    IconStyle: {
      flex:1, 
      padding:30,
      color: '#333333'
    },
    TextStyle: {
      flex:1, 
      fontSize:25,
      color: '#333333'
    }
  });