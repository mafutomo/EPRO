import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Banner from  '../components/banner';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';
import InputBox from '../components/inputbox';
import Spinner from '../components/spinner';
import CalendarNav from '../components/calendarnav';

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
          <Banner />
          <CalendarNav />
          <Content>


          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
    }

};

const styles = StyleSheet.create({
  container:{

  }
});


export default Workout;
