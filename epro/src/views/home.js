import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import SmallInputBox from '../components/smallinputbox';
import SliderVal from  '../components/slider';
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

var moment = require('moment');

export default class Home extends Component {

  constructor(props) {
     super(props)
     this.state = {
       bannerText: "Hello Ali",
       token: null,
       userId: null,
       isUpdated: false,
      }
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null){
        this.setState({
          token: token
        })
      }
    } catch (error) {
      console.log(error);
    }
    const response = await fetch('https://epro-fitness-api.herokuapp.com/auth/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        token: this.state.token
      })
    })
    const responseJson = await response.json();

    const user = await fetch(`https://epro-fitness-api.herokuapp.com/users/${responseJson.userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const userJson = await user.json()
    this.setState({
      userId: responseJson.userId,
      bannerText: `Hello ${userJson[0].first_name}`,
      isUpdated: true
    })
  }

  render() {
    return (
      <Container style={styles.body}>
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
            { this.state.isUpdated ?
              <Banner
                userId={this.state.userId}
                bannerText={this.state.bannerText}
              /> : null
              }
          <Content contentContainerStyle={{justifyContent: 'center', backgroundColor: '#FEFFFF'}}>
            { this.state.isUpdated ?
              <PersonalRecords
                userId={this.state.userId}
              /> : null
              }
              <Title style={styles.titleText}>Your Activity</Title>
            { this.state.isUpdated ?
              <HomeChart
                userId={this.state.userId}
              /> : null
              }
              <Submit />
            </Content>
            </Container>

      )
  }

};

const styles = StyleSheet.create({
    header: {
      backgroundColor: '#FEFFFF',
      justifyContent: 'center',
      alignItems: 'center',
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
    body:{
      height: '100%',
      backgroundColor: '#FEFFFF',
    },
    headerIcon: {
      color: '#17252A',
    },
    titleText: {
      backgroundColor: '#FEFFFF',
      marginTop: -550,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chart: {
      marginTop: -200
    }
  });
