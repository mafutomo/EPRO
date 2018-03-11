import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import CoverHeader from '../components/coverheader';
import InputBox from '../components/inputbox';
import Submit from '../components/submit';

class Login extends Component {

    constructor(props) {
       super(props)
       this.state = {
           email: "",
           password: "",
           buttonName: "LOGIN",
         }
   }

   loginUser = async () => {
      const response = await fetch('https://e-pro-api.herokuapp.com/login', {
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
      console.log(responseJson)
  }

  render() {
    return (
        <Container>
          <CoverHeader />
          <Content style = {styles.contentStyle}>
            <InputBox
            value={this.state.email}
            onChangeText={(text) => this.setState({email:text})}/>

            <InputBox
            value={this.state.password}
            onChangeText={(text) => this.setState({password:text})}/>

            <View style={styles.viewStyle}>
              <Text style={styles.textStyle}
              onPress={console.log("hello!")}>{`Don't have an account? Sign up here.`}</Text>
            </View>
            <Submit
            onPress={this.loginUser}
            buttonName = {this.state.buttonName}
            />
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
  },
  contentStyle:{
    paddingTop: 30,
  }
})


export default Login;
