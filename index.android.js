/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

const Firebase = require('firebase');
const GiftedMessenger = require('react-native-gifted-messenger');

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

class RNChatSample extends Component {
  constructor(props) {
    super(props);
    
    this.Config = this.GetPlatformConfig(Platform.os);
    console.log(this.Config);

    this._msgRef = new Firebase("https://react-native-chat-sample-5833d.firebaseio.com/messages");
    this._msg = [];

    this.state = {
      msg: this._msg,
    };
  }

  componentDidMount() {
    this._msgRef.on('child_added', (data) => {
      this.onReceive({
        text: data.val().text,
        name: data.val().name,
        image: {uri: data.val().avatarUrl},
        position: data.val().name == this.Config.UserName && 'right' || 'left',
        date: new Date(data.val().date),
        uniqueId: data.key()
      });
    });
  }

  setMessages(msg) {
    this._msg = msg;

    this.setState({
      msg: msg,
    });
  }

  onSend(msg) {
    this._msgRef.push({
      text: msg.text,
      name: this.Config.UserName,
      avatarUrl: this.Config.AvatarUrl,
      imageView: 'https://facebook.github.io/react/img/logo_og.png',
      date: new Date().getTime()
    })
  }

  onReceive(msg) {
    this._msg = this._msg.concat(msg);
    
    this.setState({
      msg: this._msg,      
    });
  }

  GetPlatformConfig(os){
    var Config = {};
    Config.dateLocale = 'ko';
    if (Platform.OS === 'ios') {
      Config.STATUS_BAR_HEIGHT = 0;
      Config.CONTAINER_MARGIN = 20;
      Config.UserName = 'ios Test1';
      Config.AvatarUrl = 'https://source.unsplash.com/sseiVD2XsOk/100x100';
    } else {
      Config.STATUS_BAR_HEIGHT = 27;
      Config.CONTAINER_MARGIN = 0;
      Config.UserName = 'android Test2';
      Config.AvatarUrl = 'https://source.unsplash.com/2Ts5HnA67k8/100x100';
    }  

    return Config;
  }

  render() {
    return (
      <View style={{marginTop: this.Config.CONTAINER_MARGIN}}>
        <GiftedMessenger
          styles={{
            bubbleRight: {
              marginLeft: 70,
              backgroundColor: '#007aff',
            },
          }}
          dateLocale={this.Config.dateLocale}
          messages={this.state.msg}
          handleSend={this.onSend.bind(this)}
          maxHeight={Dimensions.get('window').height - this.Config.STATUS_BAR_HEIGHT - this.Config.CONTAINER_MARGIN}
        />
      </View>   
    );
  }
}

AppRegistry.registerComponent('RNChatSample', () => RNChatSample);
