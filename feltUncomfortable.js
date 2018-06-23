import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps'
import { View, StyleSheet, Text, Button, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
let { width, height } = Dimensions.get('window');
import Aubergine from './MapStyles/Aubergine.json';


const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class feltUncomfortable extends Component {
  static navigationOptions = {
    title: "Drag to inciden's location",
    headerTintColor: '#FFFFFF',
    headerTitleStyle:{ color:'#FFFFFF' },
    headerStyle:{ backgroundColor:'#232323' },
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
      markers: [
        {
          latlng: {latitude: 37.975547, longitude: 23.734096},
          title: "Robbery",
          description: "They stole my wallet!"
        },
        {
          latlng: {latitude: 37.977297, longitude: 23.735825},
          title: "Felt Uncomfortable",
          description: "There was a guy yelling at me!"
        },
      ],
      userLatitude: null,
      userLongitude: null,
      error: null,
      incidentLatitude: null,
      incidentLongitude: null,
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
  }

  state = {
    isModalVisible: false
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });



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

  _finish(){
    if (this.state.incidentLatitude==null || this.state.incidentLongitude==null) {
      this.state.incidentLatitude=this.state.region.latitude;
      this.state.incidentLongitude=this.state.region.longitude;
      this._toggleModal();
    }
    else {
      this._toggleModal();
    }
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
            // initialRegion={initialRegion}
            // region={this.state.region}
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
            pinColor = 'blue'
            opacity={1.0}
            draggable
            onDragEnd={(e)=>{this.state.incidentLatitude=e.nativeEvent.coordinate.latitude; this.state.incidentLongitude=e.nativeEvent.coordinate.longitude}}
          />
            

            </MapView>
           <View style={{position: "absolute", bottom: 40, right: 40}}>
          <Button  onPress={()=>{this._finish()}} title="Finish" color={'#99004d'} />
          </View>

        
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
              {'\n'}{'\n'}latitude: {this.state.incidentLatitude}{'\n'}longitude: {this.state.incidentLongitude}
              </Text>
              
              <Button color={"#b30059"} onPress={()=>{this._toggleModal(); this.props.navigation.navigate('HomePage')}} title={'Home'} />
  
  
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

