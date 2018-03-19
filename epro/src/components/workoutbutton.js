import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const WorkoutButton = (props) => {

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
    fontSize: 15,
    fontFamily: 'Montserrat',
  },
  buttonStyle: {
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3AAFA9',
    padding: 8,
    borderRadius: 27,
    borderColor: '#3AAFA9',
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
  }
};


export default WorkoutButton;
