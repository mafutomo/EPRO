import React, { Component } from 'react';
import { StyleSheet, Picker } from 'react-native';
import { View, Container } from 'native-base';
import { Dropdown } from 'react-native-material-dropdown';

export default class DatePicker extends Component {
  render() {
    let data = [{
      value: 'Past 30 days',
    }, {
      value: 'Past 3 months',
    }, {
      value: 'Past 6 months',
    }];

    return (
        <Dropdown
          label='Date Range'
          data={data}
          dropdownMargins={{min: 10, max: 16}}
          containerStyle={styles.container}
          itemTextStyle={styles.text}
        />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,

  },
  text: {
    fontFamily: 'DidactGothic-Regular',
  }
})
