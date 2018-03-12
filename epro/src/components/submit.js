import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Submit = (props) => {

  const { textStyle, buttonStyle } = styles;

  return (
    <TouchableOpacity
    style={buttonStyle}
    onPress={props.onPress}>
      <Text style={textStyle}>
        {props.buttonName}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontFamily: 'Montserrat',
  },
  buttonStyle: {
    width: '68%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3aafa9',
    padding: 10,
    borderRadius: 27,
    borderColor: '#3aafa9',
    borderWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
  }
};


export default Submit;
