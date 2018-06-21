import React, { Component } from 'react'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'


export default class LiveMaps extends Component {
  static navigationOptions = {
    title: "Discover Incidents (Live)",
    headerTintColor: '#FFFFFF',
    headerTitleStyle:{ color:'#FFFFFF' },
    headerStyle:{ backgroundColor:'#232323' },
  };

  constructor(props) {
    super(props);

    this.state = {
      region: {
          latitude: 37.975547,
          longitude: 23.734096,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02
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
      error: null
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
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, distanceFilter: 100 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  render() {

    var initialRegion={
      latitude: 37.975547,
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
            // region={this.state.region}
            // onRegionChange={this.onRegionChange}
            showsUserLocation={true}
            liteMode={false}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
          >
            
            {this.state.markers.map((marker,i) => (
              <MapView.Marker key={i}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
              draggabe
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



