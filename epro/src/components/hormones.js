import React, {Component} from 'react';
import { Container, Content, Footer, Text, View } from 'react-native';
import TopNav from './topnav';
import Banner from './banner';
import LoginProgress from './loginprogress';
import BottomNav from './bottomnav';
import HormoneChart from './hormonechart.js';

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
            <Banner />
            <HormoneChart />
            <LoginProgress />
          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }
};


export default Hormones;
