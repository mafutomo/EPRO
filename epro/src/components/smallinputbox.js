import React from 'react';
import { Text, View, TextInput } from 'react-native';


const SmallInputBox = ({onChangeText}) => {

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
    borderRadius: 8,
    height: 50,
    width: 57,
    borderColor: 'rgba(58,175,169,0.5)',
    borderWidth: 2.2,
    color: '#17252A',
    textAlign: 'center',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'DidactGothic-Regular',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    alignSelf: 'center',
  }
}


export default SmallInputBox;
