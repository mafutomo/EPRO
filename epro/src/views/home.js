import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import SmallInputBox from '../components/smallinputbox';
import SliderVal from  '../components/slider';
import Head from  '../components/header';
import Banner from  '../components/banner';
import BottomNav from '../components/bottomnav';


class Home extends Component {
  constructor(props) {
     super(props)
     this.state = {

       }
  }

  render() {
    return (
        <Container>
          <Head />
          <Banner/>
          <Content>
              <SmallInputBox />
              <InputBox />
              <Submit />
              <SliderVal />
          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }

};


export default Home;
