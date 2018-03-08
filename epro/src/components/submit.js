import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Submit = () => {

  const { textStyle, buttonStyle } = styles;

  return (
    <TouchableOpacity style={buttonStyle}>
      <Text style={textStyle}>
        Login
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'DidactGothic-Regular',
  },
  buttonStyle: {
    // flex: 1,
    width: '75%',
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
