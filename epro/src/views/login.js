import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';

class Login extends Component {

    constructor(props) {
       super(props)
       this.state = {
           email: "",
           password: "",

         }
   }

   loginUser = async (method) => {
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
      console.log(this.state.email);
      console.log(this.state.password);
      console.log(responseJson)
  }

  render() {
    return (
        <Container>
          <Head />
          <Content>
            <SmallInputBox />
            <InputBox />
            <Submit />
            <SliderVal />
          </Content>
          <Footer>
          </Footer>
        </Container>
      )
  }

};


export default Login;
