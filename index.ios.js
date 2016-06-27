/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

const Firebase = require('firebase');

import MessengerContainer from './src/containers/MessengerContainer'

class RNChatSample extends Component {
  render() {
    return (
      <MessengerContainer />
    );
  }
}

AppRegistry.registerComponent('RNChatSample', () => RNChatSample);
