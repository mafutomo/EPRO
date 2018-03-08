import React from 'react';
import { Text, View, TextInput, ActivityIndicator } from 'react-native';


const Spinner = ({onChangeText}) => {

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size='large' color="#EF5B5B" />
    </View>
  )

}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  }
}


export default Spinner;
