import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

const DateDropdown = (props) => {

    return (
      <DatePicker
        style={{width: 200}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2016-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange = {props.onDateChange}
      />
    )

}

export default DateDropdown;
