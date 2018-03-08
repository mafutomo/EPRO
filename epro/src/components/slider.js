import React from 'react';
import Slider from 'react-native-slider';
import { Text, View } from 'react-native';

const SliderVal = ({onValueChange}) => {

  const {body} = styles;

  return (
    <View style = {styles.body}>
      <Slider
        onValueChange={onValueChange}
        />
         <Text>
           Value:
         </Text>
    </View>
  )
}

const styles = {
  body: {
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
    width: 200,
    alignSelf: 'center',
  }
}

export default SliderVal;
