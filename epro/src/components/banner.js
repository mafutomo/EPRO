import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Banner = (props) => {

  const {bannerStyle, bannerText} = styles;

  return (
    <TouchableOpacity
    style = {styles.bannerStyle}
    onPress = {props.onPress}>
      <Text style = {styles.bannerText}>
      {props.bannerText}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  bannerStyle: {
      backgroundColor: '#3AAFA9',
      justifyContent: 'center',
      alignItems: 'center',
      height: 53,
  },
  bannerText:{
    fontSize: 20,
    fontFamily: 'DidactGothic-Regular',
    color: '#FEFFFF'
  }
}

export default Banner;
