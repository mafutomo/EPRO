import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import SmallInputBox from '../components/smallinputbox';
import SliderVal from  '../components/slider';
import Head from  '../components/header';
import Banner from  '../components/banner';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';
import SideBar from '../components/sidebar';
import Hormones from '../views/hormones';
import ExerciseDetail from '../components/exercisedetail';
import { StackNavigator } from 'react-navigation';

import HistoryTable from '../components/historytable';

class Home extends Component {
  constructor(props) {
     super(props)
     this.state = {

       }
  }

  static navigationOptions = {
    tabBarLabel: "Home",

  }

  render() {
    return (
        <Container>
          <TopNav />
          <Banner />
          <HistoryTable />
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }

};

export default Home;
