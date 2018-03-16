import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right } from 'native-base';
import Banner from  '../components/banner';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';
import InputBox from '../components/inputbox';
import SmallInputBox from '../components/smallinputbox';
import Spinner from '../components/spinner';
import CalendarNav from '../components/calendarnav';
import ExerciseDetail from '../components/exercisedetail';
import Modal from "react-native-modal";

class Workout extends Component {

  constructor(props) {
     super(props)
     this.state = {
       bannerText: "Performance Phase",
       isModalVisible: false,
       phaseDescription: ["After the first few days of bleeding, the rising levels of estrogen in your body will help you feel more social, positive, and extroverted than you felt the week prior to your period. This is the week that you’ll likely feel your best physically, energetically, and emotionally.","As estrogen rises throughout this week, your best days to train hard start two or three days after your period begins up until a couple days before ovulation. Focus your workouts this week on resistance training and power, as rising estrogen levels will help you build more muscle and build it faster.", "As estrogen rises throughout this week, your best days to train hard start two or three days after your period begins up until a couple days before ovulation. Focus your workouts this week on resistance training and power, as rising estrogen levels will help you build more muscle and build it faster. Try your hard projects and train like a beast.", "Estrogen drops throughout your premenstrual week and the lower it goes the more it has the potential to drag down your mood and make you sad, irritable or anxious. While this isn't true for everyone, generally speaking this is a good time in your cycle for an active rest week. Remember, rest is just as important as trying hard."],

       }
  }
  //index 0 - Performance Phase, 1 - Power, 2 - Endurance, 3 - Rest

  toggleModal = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible });
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
              bannerText = {this.state.bannerText}
              onPress={this.toggleModal}
              />
          <Content>
            <CalendarNav />

          //Phase Modal
          <Modal
          isVisible={this.state.isModalVisible}
          >
          <View
          style={{ flex: 1 }}
          style={styles.modalContent}>
            <Text
            style={styles.modalTitle}>What is Performance Phase?</Text>
            <Text
            style={styles.modalDescription}
            >
            {this.state.phaseDescription[0]}
            </Text>
            <TouchableOpacity onPress={this.toggleModal}>
              <Text
              onPress = {() => this.setState({ isModalVisible: false })}
              >Exit</Text>
            </TouchableOpacity>
          </View>
        </Modal>

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
    },
    modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    marginBottom: 200,
    marginTop: 200,
    textAlign: "center",
    height: 500,
    },
    verticalBox:{
      flexDirection: 'row',
    },

  });


export default Workout;
