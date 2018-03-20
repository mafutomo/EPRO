import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { View, Container } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

const DatePicker = (props) => {

    return (
        <Dropdown
          label={props.label}
          data={props.data}
          value={props.value}
          dropdownMargins={{min: 10, max: 16}}
          containerStyle={styles.container}
          itemTextStyle={styles.text}
        />
    )

}

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  text: {
    fontFamily: 'DidactGothic-Regular',
  }
})

export default DatePicker;
