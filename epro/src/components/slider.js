import React from 'react';
import Slider from 'react-native-slider';
import { Text, View, StyleSheet } from 'react-native';

const SliderVal = (props) => {
  //
  const { track , thumb, body} = customStyles2;

  return (
    <View style = {customStyles2.body}>
      <Slider
        onValueChange={props.onValueChange}
        trackStyle={customStyles2.track}
        thumbStyle={customStyles2.thumb}
        minimumTrackTintColor='#3AAFA9'
        maximumTrackTintColor='#b7b7b7'
        />
         <Text>
           Value:
         </Text>
    </View>
  )
}

var customStyles2 = StyleSheet.create({
  body:{
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
    paddingTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#c4c4c4',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: '#CB2D6F',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  }
});

export default SliderVal;
