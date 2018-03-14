import React, { Component } from 'react';

import { Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import TopNav from '../components/topnav';
import Banner from '../components/banner';
import HormoneChart from '../components/hormonechart';
import BubbleChart from '../components/homechart';
import Hormones from '../components/hormones';
import BottomNav from '../components/bottomnav';

class Profile extends Component {

  constructor(props) {
     super(props)
     console.log('these are the profile props', this.props.screenProps);
     this.state = {
       userId: this.props.userId
     }
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
          <Content>
            <Banner />
            <View>
              <HormoneChart
                userId={this.state.userId}
              />
            </View>
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


export default Profile;
