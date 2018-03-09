import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';

class Hormones extends Component {
  constructor(props) {
     super(props)
     this.state = {

       }
  }

  render() {
    return (
        <Container>
            <TopNav />
          <Content>

          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }
};


export default Hormones;
