import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import TopNav from '../components/topnav';
import Banner from '../components/banner';
import HormoneChart from '../components/hormonechart';
import BottomNav from '../components/bottomnav';

class Profile extends Component {
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
            <Banner />
            <HormoneChart />
          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }
};


export default Profile;
