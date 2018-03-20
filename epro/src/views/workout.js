import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, TouchableOpacity, TextInput } from 'react-native';
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

     const propsNav = this.props.navigation.state.params
   console.log("PROPSNAV screenNum= ",propsNav);
     this.state = {
       bannerText: null,
       isModalVisible: false,
       modalHeader: null,
       userId: null,
       isUpdated: false,
       token: null,
       phase: null,
       screenNum:propsNav.screenNum,
       phaseDescription:
       [
         `After the first few days of bleeding, the rising levels of estrogen in your body will help you feel more social, positive, and extroverted than you felt the week prior to your period. \n \nThis is the week that you’ll likely feel your best physically, energetically, and emotionally.`,

         `As estrogen rises throughout this week, your best days to train hard start two or three days after your period begins up until a couple days before ovulation. \n \nFocus your workouts this week on resistance training and power, as rising estrogen levels will help you build more muscle and build it faster.`,

         `Muscle growth and maintenance is especially difficult during this time, and you may find it harder to perform at your max. \n \nOn the upside, you’re burning up to 30% more fat when you exercise thanks to the combination of estrogen and progesterone making your body more efficient at using fat for fuel. \n \nBonus: Exercising reduces hormone-triggered water retention by helping you sweat out excess fluid.`,

         `Some women experience little to no PMS symptoms during this time, while others have such a hard time during these days that they can’t even get out of bed. \n \nThese symptoms can also vary month-to-month and depend greatly on factors such as diet, stress levels, and your body’s personal sensitivity to hormones. \n \nIf you feel well enough to exercise, make sure you’re taking it easy and listening to your body. This may be a great time of the month to take a few days off and let your body recover as it prepares for menstruation.`
       ],

       }
  }


  async componentDidMount() {

    try {
      const token = await AsyncStorage.getItem('token');
      console.log("TOKEN ->", token);
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
    //start here
    const userResponse = await fetch(`https://epro-fitness-api.herokuapp.com/users/${responseJson.userId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    const json = await userResponse.json()
    const user = json[0]
    const daysAgo = Math.floor(( Date.parse(new Date()) - Date.parse(user.last_day)) / 86400000) % user.cycle_length;
    const currentCycleDay = daysAgo%user.cycle_length;
    const phase = user.cycle_length / 4;
  //index 0 - Performance Phase, 1 - Power, 2 - Endurance, 3 - Rest
    if (currentCycleDay >= 0 && currentCycleDay <= phase) {
      this.setState({
        phase: 1,
        bannerText: 'You are in your Power Phase',
        modalHeader: 'What is Power Phase?'
      })
    } else if (currentCycleDay > phase && currentCycleDay <= phase * 2) {
      this.setState({
        phase: 0,
        bannerText: 'You are in your Performance Phase',
        modalHeader: 'What is Performance Phase?'
      })
    } else if (currentCycleDay > phase * 2 && currentCycleDay <= phase * 3) {
      this.setState({
        phase: 2,
        bannerText: 'You are in your Endurance Phase',
        modalHeader: 'What is Endurance Phase?'
      })
    } else {
      this.setState({
        phase: 3,
        bannerText: 'You are in your Rest Phase',
        modalHeader: 'What is Rest Phase?'
      })
    }
  }

  toggleModal = () =>{
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  render() {
    console.log("this.state.screenNum",this.state.screenNum);
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
          { this.state.isUpdated ?
            <CalendarNav userId={this.state.userId}
            /> : null
          }

          //Phase Modal
          <Modal
          isVisible={this.state.isModalVisible}
          >
          <View
          style={{ flex: 1 }}
          style={styles.modalContent}>
            <Text
            style={styles.modalTitle}>{this.state.modalHeader}</Text>
            <Text
            style={styles.modalDescription}
            >
            {this.state.phaseDescription[this.state.phase]}
            </Text>
            <TouchableOpacity
            onPress={this.toggleModal}
            style = {styles.exitModalButton}>
              <Text
              style = {styles.exitModalText}
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
    textAlign: "center",
    marginTop: -100,
    height: 500,
    },
    modalTitle:{
      fontSize: 18,
      fontFamily: 'Montserrat',
      fontWeight: '700',
      textAlign: 'center',
      paddingBottom: 35,
    },
    modalDescription:{
      fontSize: 16,
      fontFamily: 'Montserrat',
      marginBottom: 20,
    },
    exitModalText: {
      alignSelf: 'center',
      color: '#FEFFFF',
      fontSize: 15,
      fontFamily: 'Montserrat',
    },
    exitModalButton: {
      width: '30%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3AAFA9',
      padding: 8,
      borderRadius: 27,
      borderColor: '#3AAFA9',
      borderWidth: 1,
      marginTop: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.2,
    }
  });


export default Workout;
