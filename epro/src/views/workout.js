import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Banner from  '../components/banner';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';
import InputBox from '../components/inputbox';
import Spinner from '../components/spinner';
import CalendarNav from '../components/calendarnav';
import ExerciseDetail from '../components/exercisedetail';

class Workout extends Component {

  constructor(props) {
     super(props)
     this.state = {

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
            <CalendarNav />
            <ExerciseDetail />
          </Content>
          <View style={styles.iconContainer}>
            <Icon
              active name="add-circle"
              size={45}
              color={'#FFBA49'}
            />
          </View>
        </Container>
      )
    }
};

const styles = StyleSheet.create({
  iconContainer:{
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
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


export default Workout;
