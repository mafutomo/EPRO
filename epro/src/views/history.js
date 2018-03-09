import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Footer, Content } from 'native-base';
import TopNav from '../components/topnav';
import Banner from '../components/banner';
import DatePicker from '../components/dropdown';
import HistoryTable from '../components/historytable';
import BottomNav from '../components/bottomnav';

class History extends Component {
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
            <DatePicker />
            <HistoryTable />
          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }

};


export default History;
