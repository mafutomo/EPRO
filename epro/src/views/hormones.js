import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Banner from '../components/banner'
import BottomNav from '../components/bottomnav'
import TopNav from '../components/topnav'
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
          <Banner/>
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
