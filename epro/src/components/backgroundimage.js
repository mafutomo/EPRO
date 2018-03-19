import React, { Component } from 'react';
import {
  AppRegistry,
  ImageBackground, StyleSheet
} from 'react-native';

const Background = () => {
  return (
    <ImageBackground style={styles.backgroundStyle} source={require('../images/kati_copy.jpg')} />
  )
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
})

export default Background;
