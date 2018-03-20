import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, TextInput} from 'react-native';
import { Container, Header, Footer, Content, Button, Toast } from 'native-base';
import CoverHeader from '../components/coverheader';
import InputBox from '../components/inputbox';
import Submit from '../components/submit';
import { StackNavigator } from "react-navigation";
import PasswordInputText from 'react-native-hide-show-password-input';
import Background from '../components/backgroundimage';

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
           userId: null,
           showToast: false
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
      console.log(responseJson);
      if (responseJson.token) {
        try {
          await AsyncStorage.setItem('token', responseJson.token)
        }
        catch (error){
          console.log(error);
        }
      }else{
        this.setState({
          showToast: true,
          email: '',
          password: '',
        })
      }
      const token = await AsyncStorage.getItem('token')
      this.setState({
        email: '',
        password: '',
        loggedIn: true,
        userId: responseJson.claim.user_id,
      })

      this.props.navigation.navigate("Home",{
        userId: this.state.userId
        })
  }

  onLoginSuccess(){
    this.setState({
      email: '',
      password: '',
    })
  }

  render() {
    return (
        <Container style = {styles.background}>
          <Background />
          <Text
          style={styles.titleText}>E/PRO</Text>
          <Content style = {styles.contentStyle}>
            <TextInput
              secureTextEntry={false}
              style = {styles.inputStyle}
              autoCapitalize = "none"
              value={this.state.email}
              placeholder={this.state.placeholderEmail}
              onChangeText={(text) => this.setState({email:text})}/>

            <TextInput
              secureTextEntry={true}
              style = {styles.inputStyle}
              autoCapitalize = "none"
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
            { this.state.showToast ?
              <Submit
                onPress={() => {
                  Toast.show({
                    text: 'Invalid email or password',
                    position: 'bottom',
                    buttonText: 'Okay'
                  })
                }}
                buttonName = {this.state.buttonName}
                /> :
              <Submit
                buttonName = {this.state.buttonName}
                onPress={this.loginUser}
                />
              }
          </Content>
        </Container>
      )
  }

};

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#f9f9f9',
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
    paddingTop: 10,
    marginTop: 335,
  },
  inputStyle: {
    backgroundColor: '#FEFFFF',
    borderRadius: 27,
    height: 45,
    width:  250,
    borderColor: 'rgba(58,175,169,0.5)',
    borderWidth: 2.5,
    color: '#17252A',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'DidactGothic-Regular',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    alignSelf: 'center',
  },
  titleText: {
    fontFamily: 'Montserrat',
    fontSize: 37,
    color: 'black',
    alignSelf: 'center',
    marginBottom: -35,
    marginTop: 27,
    textShadowColor: 'rgba(23,37,42, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
  },
})
