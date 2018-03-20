import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Container, Header, Footer, Content, Toast } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import LoginProgress from '../components/loginprogress';

class SignUp extends Component {
  constructor(props) {
     super(props)
     this.state = {
       buttonName: "CONTINUE",
       firstName: "",
       lastName: "",
       email: "",
       password: "",
       passwordRetype: "",
       placeholderFirstName: "First Name",
       placeholderLastName: "Last Name",
       placeholderEmail: "myemail@example.com",
       placeholderPassword: "password",
       placeholderRetypePassword: "Retype password",
       headerText: "E/Pro is a fitness app that allows users to better understand their own physiology and create tailored workout plans"
       }

       this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleSubmit(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.state.firstName === ""){
      return Toast.show({
        text: 'Please enter your first name',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.lastName === ""){
      return Toast.show({
        text: 'Please enter your last name',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.email === "" || !re.test(this.state.email)){
      return Toast.show({
        text: 'Please enter a valid email address',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.password === ""){
      return Toast.show({
        text: 'Please enter a password',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.passwordRetype === ""){
      return Toast.show({
        text: 'Please re-enter your password',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    if (this.state.passwordRetype !== "" && this.state.password !== this.state.passwordRetype){
      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordRetype: ""
      })
      return Toast.show({
        text: 'Password does not match',
        position: 'bottom',
        buttonText: 'Okay'
      })
    }
    this.props.navigation.navigate("SignUp2",{
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
      })
  }

  render() {
    return (
        <Container style = {styles.background}>

          <HeaderSignIn
            headerText={this.state.headerText}
            onPress={() => this.props.navigation.goBack()}
          />
          <Content style = {styles.content}>

          <TextInput
            secureTextEntry={false}
            style = {styles.inputStyle}
            autoCapitalize = "none"
            value={this.state.firstName}
            placeholder={this.state.placeholderFirstName}
            onChangeText={(text) => this.setState({firstName:text})}/>
          <TextInput
            secureTextEntry={false}
            style = {styles.inputStyle}
            autoCapitalize = "none"
            value={this.state.lastName}
            placeholder={this.state.placeholderLastName}
            onChangeText={(text) => this.setState({lastName:text})}/>
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
          <TextInput
            secureTextEntry={true}
            style = {styles.inputStyle}
            autoCapitalize = "none"
            value={this.state.passwordRetype}
            placeholder={this.state.placeholderRetypePassword}
            onChangeText={(text) => this.setState({passwordRetype:text})}/>

          <Submit
            buttonName = {this.state.buttonName}
            onPress={this.handleSubmit}
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
})


export default SignUp;
