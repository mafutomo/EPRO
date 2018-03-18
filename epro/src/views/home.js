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

export default class Home extends Component {

  constructor(props) {
     super(props)
     this.state = {
       bannerText: "Hello Ali",
       token: null,
       userId: null,
       isUpdated: false
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
    this.setState({
      userId: responseJson.userId,
      isUpdated: true
    })
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
        { this.state.isUpdated ?
          <Banner
            userId={this.state.userId}
          /> : null
          }
        { this.state.isUpdated ?
          <PersonalRecords
            userId={this.state.userId}
          /> : null
          }
        { this.state.isUpdated ?
          <HomeChart
            userId={this.state.userId}
          /> : null
          }
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
