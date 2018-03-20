import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import TopNav from '../components/topnav';
import Banner from '../components/banner';
import DatePicker from '../components/dropdown';
import HistoryTable from '../components/historytable';
import BottomNav from '../components/bottomnav';

class History extends Component {
  constructor(props) {
     super(props)
     this.state = {
       token: null,
       userId: null,
       isUpdated: false,
       bannerText: null,
     }
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null){
        console.log(token);
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
    /// start
    const user = await fetch(`https://epro-fitness-api.herokuapp.com/users/${responseJson.userId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const userJson = await user.json()
    this.setState({
      bannerText: `Hello ${userJson[0].first_name}`
    })
  }

  render() {
    console.log("banner text",this.state.bannerText);

      let dropdownVal = [{
        value: 'Past 30 days',
      }, {
        value: 'Past 3 months',
      }, {
        value: 'Past 6 months',
      }];


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
              bannerText={"Workout History"}
            /> : null
            }
          <Content>
            { this.state.isUpdated ?
              <DatePicker
                userId={this.state.userId}
                data={dropdownVal}
                value={'Past 30 days'}
              /> : null
              }
            { this.state.isUpdated ?
              <HistoryTable
                userId={this.state.userId}
              />
               : null
              }
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


export default History;
