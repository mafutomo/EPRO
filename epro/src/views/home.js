import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import SmallInputBox from '../components/smallinputbox';
import SliderVal from  '../components/slider';
import Head from  '../components/header';
import Banner from  '../components/banner';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';
import SideBar from '../components/sidebar';
import ExerciseDetail from '../components/exercisedetail';
import { StackNavigator } from 'react-navigation';
import PersonalRecords from '../components/personalrecords';
import HomeChart from '../components/homechart';
import HistoryTable from '../components/historytable';
import DatePicker from '../components/dropdown';
import LoginProgress from '../components/loginprogress';

export default class Home extends Component {

  constructor(props) {

     super(props)
     const propsNav = this.props.navigation.state.params;
     console.log('these are the home props', propsNav);
     this.state = {
       bannerText: "Hello Ali",
       userId: propsNav.userId,
       }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:3001/auth/status', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': AsyncStorage.getItem('token')
      }
    })
    console.log(response);
  }

  render() {
    return (
        <Container>
        <Header style={styles.header}>
          <Left>
            <Button
            transparent
             onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name='menu' style={styles.headerIcon}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.topNavText}>E/PRO</Title>
          </Body>
          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>
          <Banner
          bannerText = {this.state.bannerText}/>
          <PersonalRecords />
          <HomeChart />
          <Submit />
        </Container>
      )
  }

};

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#FEFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      paddingTop: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.2,
      position: 'relative',
      height: 75,
    },
    topNavText: {
      color: '#17252A',
      fontFamily: 'Montserrat',
      fontSize: 22,
      alignSelf: 'center',
    },
    headerIcon: {
      color: '#17252A',
    }
  });
