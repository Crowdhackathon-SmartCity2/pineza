import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps'
import { View, StyleSheet, Text, Button, Dimensions, AsyncStorage, TouchableHighlight, Share, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
let { width, height } = Dimensions.get('window');
import Aubergine from './MapStyles/Aubergine.json';
import DateTimePicker from 'react-native-modal-datetime-picker';

const ASPECT_RATIO = width / height;
const LATITUDE = 37.972547;
const LONGITUDE = 23.734096;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class feltUncomfortable extends Component {
  static navigationOptions = {
    title: "Drag to inciden's location",
    headerTintColor: '#FFFFFF',
    headerTitleStyle:{ color:'#FFFFFF' },
    headerStyle:{ backgroundColor:'#33001a' },
  };

  constructor(props) {
    super(props);

    this.state = {
      region: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
      },
      userLatitude: null,
      userLongitude: null,
      error: null,
      incidentLatitude: null,
      incidentLongitude: null,
      incidentDate: null,
      key1: "",
      isDateTimePickerVisible: false,
      category: '',
      email: null,
      info: "",
      pinezaColor: 'red',
      isModalVisible: false,
      isChoiceVisible: true
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
  }

  state = {
    
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  _toggleChoice = () =>
    this.setState({ isChoiceVisible: !this.state.isChoiceVisible });

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.state.incidentDate=date
    this._hideDateTimePicker();
  };

  _onShare() {
    Share.share({
      message: 'I ',
      url: '',
      title: ''
    }, {
      dialogTitle: 'Share your Incident',
    })
  }


  onRegionChange(region) {
    this.setState({ region });
  }

  // moveMaptoLocation(latlng) {
  //   this.refs.map.animateToRegion({
  //       latitudeDelta: 0.002,
  //       longitudeDelta: 0.002,
  //       ...latlng,     
  //   }, 3000);
  // }
  moveMaptoLocation(latlng) {
    this.setState({
      region:{
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
        ...latlng,     
      }
    });
  }

  
  componentDidMount() {
    AsyncStorage.getItem('@MySuperStore:key').then((token) => {
    this.setState({key1 : token})
    })
    // AsyncStorage.getItem('@MySuperStore:category').then((token) => {
    //   this.setState({category : token})
    // })
    AsyncStorage.getItem('@MySuperStore:email').then((token) => {
      this.setState({email : token})
    })
    // AsyncStorage.getItem('@MySuperStore:info').then((token) => {
    //   this.setState({info : token})
    // })

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  async _finish(){

    var lat_save;
    var lon_save;

    if (this.state.incidentLatitude!=null && this.state.incidentLongitude!=null) {
      lat_save=this.state.incidentLatitude;
      lon_save=this.state.incidentLongitude;
    } 
    else {
      lat_save = this.state.region.latitude
      lon_save = this.state.region.longitude
    }
      await fetch('https://pestoapp.herokuapp.com/pin/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Token '+this.state.key1
         },
        body: JSON.stringify({
          user: this.state.email,
          area: this.state.pinezaColor,
          latitude: lat_save,
          longitude: lon_save,
          category: this.state.category,
          info: this.state.incidentDate+"\n ",
          time: this.state.incidentDate
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Feedback",responseJson)
      });
      this._toggleModal();
      
  }


  render() {

    var initialRegion={
      latitude: 37.972547,
      longitude: 23.734096,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    } 

    var userMarker={
      latlng: {latitude: this.state.userLatitude, longitude: this.state.userLongitude},
      title: "User"
    }
    
      return (
        <View style={styles.container}>

          <MapView style={styles.map}
            initialRegion={initialRegion}
            // onRegionChange={this.onRegionChange}
            region={ this.state.region }
            onRegionChangeComplete= {region => this.setState({region})}
            showsUserLocation={true}
            liteMode={false}
            showsUserLocation={ true }
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            // customMapStyle={Aubergine}
          >
            
          
          <MapView.Marker 
            coordinate={this.state.region}
            title={"Felt Uncomfortable"}
            pinColor = {this.state.pinezaColor}
            opacity={1.0}
            draggable
            onDragEnd={(e)=>{this.state.incidentLatitude=e.nativeEvent.coordinate.latitude; this.state.incidentLongitude=e.nativeEvent.coordinate.longitude}}
          />
            

            </MapView>
           <View style={{
             position: "absolute", 
             bottom: 40, 
             right: 40, 
            //  backgroundColor: 'black', 
            //  borderRadius: 3
            }}>

           {/* <Text style={{color:'white'}}> Last Step! </Text> */}
          <Button  onPress={()=>{this._finish()}} title="Finish" color={'#99004d'} />
          
          </View>


          

          <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={"datetime"}
          />

        
          <Modal 
          isVisible={this.state.isModalVisible}
          backdropColor={'#33001a'}
          backdropOpacity={0.85}
          onBackButtonPress={this._toggleModal}
          style={styles.infoModal}
          >
            <View style={styles.infoView}>
              <Text style={{color: '#33ffff', padding:20, textAlign: 'center', fontSize:25}}>Pineza Dropped!</Text>
              <Icon name={"check-circle"}  size={40} color="#00ff99"/>
              <Text style={{color: '#33ffff', padding:20, textAlign: 'center', fontSize: 15}} > 
              Your Incident has been recorded successfuly!{'\n'}{'\n'}Thank you for sharing your experience and helping yourshelf by helping others! Maybe you want to share your experience to your social media. 
              </Text>
              
              <View style={{padding:20}}>
                <Button color={"#888888"} onPress={() => {this._onShare()}} title={'Share incident'} />
              </View>
              <Button color={"#b30059"} onPress={()=>{this._toggleModal(); this.props.navigation.navigate('HomePage')}} title={'Home'} />
              
            </View>
          </Modal>

          <Modal 
          isVisible={this.state.isChoiceVisible}
          backdropColor={'#33001a'}
          backdropOpacity={0.85}
          onBackButtonPress={this._toggleChoice}
          style={styles.infoModal}
          >
            <View style={styles.infoView}>
              <Text style={{color: '#33ffff', paddingBottom:50, textAlign: 'center', fontSize:23}}>What happend?</Text>
              <Button color={"#b38f00"} onPress={()=>{this.state.category = 'Felt Uncomfortable'; this.state.pinezaColor = "yellow"; this._toggleChoice(); this._showDateTimePicker()}} title={'Just felt uncomfortable'} />
              <Text style={{color: '#33ffff', paddingTop :50, textAlign: 'center', fontSize: 20}} > 
                OR
              </Text>
              <Text style={{color: '#33ffff', paddingBottom:45, textAlign: 'center', fontSize: 18}} > 
                Choose one of the incedents below {'\n'}and then press next
              </Text>

              <View style={{
                backgroundColor: '#ffe6f2', 
                borderRadius: 3,
          
               }}>
              <Picker
                selectedValue={this.state.category}
                style={{ height: 35, width: 250 }}
                onValueChange={(itemValue, itemIndex) => this.setState({category: itemValue})}>
                <Picker.Item label="Pickpocket" value="Pickpocket" />
                <Picker.Item label="Robbery 1" value="Robbery 1" />
                <Picker.Item label="Robbery 2" value="Robbery 2" />
                <Picker.Item label="Robbery 3" value="Robbery 3" />
              </Picker>
              </View>

              <View style={{padding:10}}>
              
              <Button color={"#b30059"} onPress={()=>{this._toggleChoice();  this._showDateTimePicker()}} title={'next'} />
              </View>
            </View>
          </Modal>

        </View>
      );

}
}

class CustomMarker extends Component {
  render() {
    return(
      <MapView.Marker 
        coordinate={{
          latitude: this.props.latitude,
          longitude: this.props.longitude
        }}
        title={this.props.title}
        description={this.props.description}
        pinColor = 'blue'
        opacity={1.0}
        draggable
        onDragEnd={this.props.onDragEnd}
        />
    )
  }
}


var styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // width: width,
    // height: height*2/3
  },
  button:{
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderColor: 'black',
    margin: 10
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
  }
});

