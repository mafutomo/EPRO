import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Icon from 'react-native-ionicons'
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
          <TopNav />
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
          <Footer>
            <BottomNav/>
          </Footer>
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
  }
});


export default Workout;
