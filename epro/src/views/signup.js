import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
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
       }
  }

  render() {
    return (
        <Container style = {styles.background}>

          <HeaderSignIn
          onPress={() => this.props.navigation.goBack()}
          />
          <Content style = {styles.content}>
          <LoginProgress
          progress={0.5}/>

          <InputBox
          value={this.state.firstName}
          placeholder={this.state.placeholderFirstName}
          onChangeText={(text) => this.setState({firstName:text})}/>
          <InputBox
          value={this.state.lastName}
          placeholder={this.state.placeholderLastName}
          onChangeText={(text) => this.setState({lastName:text})}/>
          <InputBox
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
            onPress={() => this.props.navigation.navigate("SignUp2",{
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
              password: this.state.password
              })}
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
