import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { View } from 'native-base';
export default class Dropdown extends Component {
  render() {
    return (
      <View>
        <Picker>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    )
  }
}
