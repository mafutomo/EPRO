import React from 'react';
import { Text, View, TextInput } from 'react-native';


const InputBox = ({onChangeText}) => {

  const { inputStyle, } = styles;

  return (
    <View>
      <TextInput
      style = {styles.inputStyle}
      autoCapitalize = "none"
      onChangeText={onChangeText}/>
    </View>
  )

}

const styles = {
  inputStyle: {
    backgroundColor: '#FEFFFF',
    borderRadius: 27,
    height: 45,
    width:  250,
    borderColor: 'rgba(58,175,169,0.5)',
    borderWidth: 2.5,
    color: '#17252A',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    // fontFamily: 'DidactGothic-Regular',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    alignSelf: 'center',
  },
}


export default InputBox;
