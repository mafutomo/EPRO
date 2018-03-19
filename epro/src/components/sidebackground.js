import React, { Component } from 'react';
import {
  AppRegistry,
  ImageBackground, StyleSheet
} from 'react-native';

const SideBackground = () => {
  return (
    <ImageBackground style={styles.backgroundStyle} source={require('../images/kati2_crop.jpg')} />
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

export default SideBackground;
