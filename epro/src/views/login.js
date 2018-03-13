import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import InputBox from '../components/inputbox';
import Submit from '../components/submit';

class Login extends Component {

    constructor(props) {
       super(props)
       this.state = {
           email: "",
           password: "",

         }
   }

   loginUser = async (method) => {
      const response = await fetch('https://epro-fitness-api.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({
          email:this.state.email,
          password:this.state.password
        }),
      })
      const responseJson = await response.json()
      console.log(this.state.email);
      console.log(this.state.password);
      console.log(responseJson)
  }

  render() {
    return (
        <Container>
          <HeaderSignIn />
          <Content>
            <InputBox />
            <InputBox />
            <View style={styles.viewStyle}>
              <Text style={styles.textStyle}>Don't have an account? Sign up here.</Text>
            </View>
            <Submit />
          </Content>
        </Container>
      )
  }

};

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textStyle: {
    color: '#17252A',
    fontSize: 14,
    fontFamily: 'DidactGothic-Regular',
  }
})


export default Login;
