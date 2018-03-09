import React from 'react';
import { Text, View } from 'react-native';

const Banner = () => {

  const {bannerStyle, bannerText} = styles;

  return (
    <View style = {styles.bannerStyle}>
      <Text style = {styles.bannerText}>Hello Ali</Text>
    </View>
  )
}

const styles = {
  bannerStyle: {
      backgroundColor: '#2B7A78',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      position: 'relative',
  },
  bannerText:{
    fontSize: 20,
    fontFamily: 'DidactGothic-Regular',
    color: '#FEFFFF'
  }
}

export default Banner;
