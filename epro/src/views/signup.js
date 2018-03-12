import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import { StackNavigator } from "react-navigation";

class SignUp extends Component {
  constructor(props) {
     super(props)
     this.state = {

       }
  }

  render() {
    return (
        <Container>
          <HeaderSignIn/>
          <Content>

          </Content>

        </Container>
      )
  }
};


export default SignUp;
