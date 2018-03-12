import React, { Component } from 'react';
import { Text, View, StyleSheet, DatePickerIOS } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import LoginProgress from '../components/loginprogress';
import DatePicker from 'react-native-datepicker';

class SignUp2 extends Component {
  constructor(props) {
     super(props)
     this.state = {
       buttonName: "SIGN UP",
       chosenDate: new Date()
       }
     this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
   this.setState({chosenDate: newDate})
  }

  render() {
    console.log("this.state.date = ",this.state.date);
    return (
        <Container style={styles.background} >
          <HeaderSignIn
          onPress={() => this.props.navigation.goBack()}
          />
          <Content style = {styles.content}>
          <LoginProgress
          progress={0.90}/>

          <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
          />


          <Submit
            buttonName = {this.state.buttonName}
            onPress={() => console.log("stuff for login!")}
            />
          </Content>

        </Container>
      )
  }
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f9f9f9',
  },
  content: {
    marginTop: -225,
  }
})


export default SignUp2;
