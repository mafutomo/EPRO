import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage} from 'react-native';
import { Container, Header, Footer, Content, Button } from 'native-base';
import CoverHeader from '../components/coverheader';
import InputBox from '../components/inputbox';
import Submit from '../components/submit';
import { StackNavigator } from "react-navigation";

export default class Login extends React.Component {

    constructor(props) {
       super(props)
       this.state = {
           email: "",
           password: "",
           buttonName: "LOGIN",
           placeholderEmail: "youremail@example.com",
           placeholderPassword: "password",
           loggedIn: false,
           userId: null
         }
   }

   loginUser = async () => {
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
      if (responseJson.token) {
        try {
          await AsyncStorage.setItem('token', responseJson.token)
        }
        catch (error){
          console.log(error);
        }
      }
      const token = await AsyncStorage.getItem('token')
      this.setState({
        loggedIn: true,
        userId: responseJson.claim.user_id,
      })
      // console.log(this.state);
      this.props.navigation.navigate("Home",{
        userId: this.state.userId
        })
  }



  render() {
    return (
        <Container style = {styles.background}>
          <CoverHeader />
          <Content style = {styles.contentStyle}>
            <InputBox
            value={this.state.email}
            placeholder={this.state.placeholderEmail}
            onChangeText={(text) => this.setState({email:text})}/>

            <InputBox
            value={this.state.password}
            placeholder={this.state.placeholderPassword}
            onChangeText={(text) => this.setState({password:text})}/>

            <View style={styles.viewStyle}>
              <Button
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate("SignUp")}>
              <Text style={styles.textStyle}>{`Don't have an account? Sign up here.`}</Text>
              </Button>
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
  background: {
    backgroundColor: '#f9f9f9',
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    marginTop: -12,
    marginBottom: -5,
    alignSelf: 'center',
  },
  textStyle: {
    color: '#EF5B5B',
    fontSize: 16,
    fontFamily: 'DidactGothic-Regular',
  },
  contentStyle:{
    paddingTop: 25,
  }
})
