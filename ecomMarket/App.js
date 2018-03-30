/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,TextInput
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fromPlace:'',
      toPlace:'',
      distance:'',
      duration:'',
    }
  }
  componentDidMount() {
   
  }
  showDetails(){
    return fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+this.state.fromPlace+'&destination='+this.state.toPlace+'&key=AIzaSyCQ4WM-O_HPS11QiuOXADdhiW4tirwDplc')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      this.setState({
        distance:responseJson.routes[0].legs[0].distance.text,
        duration:responseJson.routes[0].legs[0].duration.text,
      }, function() {
        // do something with new state
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <Text>
        From:
      </Text>
      <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({fromPlace:text})}
        value={this.state.fromPlace}
      />
      <Text>
        To:
      </Text>
      <TextInput
        style={{height: 40,width:200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({toPlace:text})}
        value={this.state.toPlace} onEndEditing={()=>this.showDetails()}
      />
      
        <Text style={styles.welcome}>
          
          {this.state.fromPlace && <Text>Total distance form {this.state.fromPlace} to {this.state.toPlace} is =
          {this.state.distance}</Text>} 
          
        </Text>
        <Text style={styles.welcome}>
        {this.state.duration && <Text>
       Thaks and try again with other places 
        </Text>
        }
        </Text>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
