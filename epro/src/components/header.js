import React from 'react';
import { Text, View } from 'react-native';


const Head = () => {
  //descructure styles to reference our style object below. Then we'll put in the style prop
  const { header, headerText, } = styles;

  return (
    <View style = {styles.header}>
      <Text style = {styles.headerText}>E/PRO</Text>
    </View>
  )
};

const styles = {
  header: {
    backgroundColor: '#FEFFFF',
    justifyContent: 'center',
      alignItems: 'center',
    height: 70,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    position: 'relative',
  },
  headerText: {
    fontSize: 17,
    // fontFamily: 'Montserrat',
  },
}



export default Head;
