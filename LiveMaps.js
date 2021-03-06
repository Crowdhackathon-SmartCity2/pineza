import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, Button, AsyncStorage } from 'react-native'
let { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE = 37.975547;
const LONGITUDE = 23.734096;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class LiveMaps extends Component {
  static navigationOptions = {
    title: "Discover Incidents (Live)",
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
      markers: [],
      userLatitude: null,
      userLongitude: null,
      error: null,
      pins: []
    }
    this.onRegionChange = this.onRegionChange.bind(this);
    this.moveMaptoLocation = this.moveMaptoLocation.bind(this);
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

    AsyncStorage.getItem('@MySuperStore:pins').then((pins) => {
      pinsJson = JSON.parse(pins)
      this.setState({markers : pinsJson})
      console.log(this.state.markers)
    })
    

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


  render() {

    var initialRegion={
      latitude: 0,
      longitude: 0,
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
            // region={this.state.region}
            // onRegionChange={this.onRegionCharnge}
            showsUserLocation={true}
            showsMyLocationButton={true}
            liteMode={false}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            onRegionChangeComplete= {region => this.setState({region})}
            region={ this.state.region }

          >
            
          

          {this.state.markers.map((marker,i) => (
              <MapView.Marker key={i}
              coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
              title={marker.category}
              description={marker.info}
              pinColor = {marker.area}
              />
            ))}
          

          </MapView>
        

       
          {/*<View style={styles.container}>
            {this.state.markers.map((marker,i) => (
            <LocationButton key={i}
            moveMaptoLocation={this.moveMaptoLocation}
            marker={marker}/>
            ))}
          </View>
          <View style={styles.container}>
            <LocationButton
            moveMaptoLocation={this.moveMaptoLocation}
            marker={userMarker}/>
            {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
          </View> */}
        </View>
      );
  }
}

class LocationButton extends Component {
  render(){
    return(
      <TouchableOpacity style={styles.button} onPress={()=>
      this.props.moveMaptoLocation(this.props.marker.latlng)}>
      <Text>{this.props.marker.title}</Text>
      </TouchableOpacity>
    )
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
        pinColor = 'red'
        opacity={1.0}
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
  }
});



