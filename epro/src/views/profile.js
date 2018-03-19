import React, { Component } from 'react';
import * as Progress from 'react-native-progress';
import { Text, View, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Container, Header, Footer, Content, Left, Button, Icon, Body, Title, Right, Tabs, Tab, Grid, Col, Row, Badge } from 'native-base';
import TopNav from '../components/topnav';
import Banner from '../components/banner';
import HormoneChart from '../components/hormonechart';
import BubbleChart from '../components/homechart';
import Hormones from '../components/hormones';
import BottomNav from '../components/bottomnav';
import Modal from "react-native-modal";

class Profile extends Component {

  constructor(props) {
     super(props)
     this.state = {
       token: null,
       userId: null,
       cycleLength: 0,
       firstDayLastPeriod: '',
       isUpdated: false,
       phase: null,
       progress: null,
       bannerText: '',
       isModalVisible: false,
       phaseText: '',
       exerciseText: '',
       nutritionText: ''
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

    if (currentCycleDay >= 0 && currentCycleDay <= phase) {
      this.setState({
        cycleLength: user.cycle_length,
        firstDayLastPeriod: user.last_day,
        dayCurrCycle: currentCycleDay,
        phase: 1,
        progress: currentCycleDay/user.cycle_length,
        phaseText: "Power Phase",
        bannerText: 'You are in your Power Phase'
      })
    } else if (currentCycleDay > phase && currentCycleDay <= phase * 2) {
      this.setState({
        cycleLength: user.cycle_length,
        firstDayLastPeriod: user.last_day,
        dayCurrCycle: currentCycleDay,
        phase: 2,
        progress: currentCycleDay/user.cycle_length,
        phaseText: "Performance Phase",
        bannerText: 'You are in your Performance Phase'
      })
    } else if (currentCycleDay > phase * 2 && currentCycleDay <= phase * 3) {
      this.setState({
        cycleLength: user.cycle_length,
        firstDayLastPeriod: user.last_day,
        dayCurrCycle: currentCycleDay,
        phase: 3,
        progress: currentCycleDay/user.cycle_length,
        phaseText: "Endurance Phase",
        bannerText: 'You are in your Endurance Phase'
      })
    } else {
      this.setState({
        cycleLength: user.cycle_length,
        firstDayLastPeriod: user.last_day,
        dayCurrCycle: currentCycleDay,
        phase: 4,
        progress: currentCycleDay/user.cycle_length,
        phaseText: "Rest Phase",
        bannerText: 'You are in your Rest Phase'
      })
    }

    const phaseResponse = await fetch(`https://epro-fitness-api.herokuapp.com/phase_tips/${this.state.phase}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    const phaseJson = await phaseResponse.json();
    this.setState({
      exerciseText: phaseJson[0].exercise_tip,
      nutritionText: phaseJson[0].nutrition_tip
    })
  }

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
          <Content>
          { this.state.isUpdated ?
            <Banner
              bannerText = "Cycle Overview"
              userId={this.state.userId}
            /> : null
            }
            <View>
              <Grid >
                  <Col
                    style={{paddingLeft: 10, paddingTop: 5}}
                    size={1} backgroundColor={'#FEFFFF'}>
                    <Icon name="square" isActive={true} style={{color: '#501F3A', fill: '#501F3A', fontSize: 12}}/>
                  </Col>
                  <Col
                    style={{paddingTop: 5}}
                    size={3}
                    backgroundColor={'#FEFFFF'}>
                    <Text style={{fontSize: 14, fontFamily: 'DidactGothic-Regular'}}>Estrogen(pg/ml)</Text>
                  </Col>
                  <Col
                    style={{paddingTop: 5}}
                    size={1}
                    backgroundColor={'#FEFFFF'}>
                    <Icon name="square" isActive={true} style={{color: '#CB2D6F', fontSize: 12 }}/>
                  </Col>
                  <Col
                    style={{paddingRight: 10, paddingTop: 5}}
                    size={3}
                    backgroundColor={'#FEFFFF'}>
                    <Text>Progesterone(ng/ml)</Text>
                  </Col>
              </Grid>
            </View>
          { this.state.isUpdated ?
            <View>
              <HormoneChart
                userId={this.state.userId}
              />
            </View> : null
            }
            <View style={styles.container}>
              <Progress.Bar
                progress={this.state.progress}
                width={300}
                height={12}
                color={'#FFBA49'}
                borderWidth={0.5}
              />
              <Text style={styles.progressText}>Day: {this.state.dayCurrCycle}</Text>
            </View>
            <View>
              <Title style={styles.titleText}>{this.state.bannerText}</Title>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.toggleModal}
              >
              <Text
                style={styles.textStyle}>
                Learn More
              </Text>
            </TouchableOpacity>
            <Modal
            isVisible={this.state.isModalVisible}
            style={{ flex: 1 }}
            style={styles.modalContent}
            >
              <Tabs initialPage={1}
                tabBarUnderlineStyle = {{backgroundColor: '#501F3A'}}>
                <Tab heading="Exercise Tips"
                  tabStyle={{backgroundColor: "white"}}
                  activeTextStyle={{color: "#501F3A"}}>
                  <View>
                    <Text
                    style={styles.modalTitle}>{this.state.phaseText}</Text>
                    <Text
                    style={styles.modalDescription}
                    >
                    {this.state.exerciseText}
                    </Text>
                    <TouchableOpacity style={styles.exitModalButton} onPress={this.toggleModal}>
                      <Text
                        style={styles.exitModalText}
                      onPress = {() => this.setState({ isModalVisible: false })}
                      >Exit</Text>
                    </TouchableOpacity>
                  </View>
                </Tab>
                <Tab heading="Nutrition Tips"
                  tabStyle={{backgroundColor: "white"}}
                  textStyle={{fontFamily: 'Montserrat'}}
                  activeTextStyle={{color: "#501F3A"}}>
                  <View>
                    <Text
                    style={styles.modalTitle}>{this.state.phaseText}</Text>
                    <Text
                    style={styles.modalDescription}
                    >
                    {this.state.nutritionText}
                    </Text>
                    <TouchableOpacity style={styles.exitModalButton} onPress={this.toggleModal}>
                      <Text
                        style={styles.exitModalText}
                      onPress = {() => this.setState({ isModalVisible: false })}
                      >Exit</Text>
                    </TouchableOpacity>
                  </View>
                </Tab>
              </Tabs>
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
    titleText: {
      backgroundColor: "#FEFFFF",
      width: '100%',
      color: '#17252A',
      fontFamily: 'Montserrat',
      fontSize: 18,
      textAlign: 'center',
      alignSelf: 'center',
      paddingTop: 5,
      paddingBottom: 10,
      fontWeight: '600',
    },
    progressText: {
      color: '#17252A',
      fontFamily: 'Montserrat',
      fontSize: 18,
      alignSelf: 'center',
    },
    headerIcon: {
      color: '#17252A',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    textStyle: {
      alignSelf: 'center',
      color: 'white',
      fontSize: 18,
      fontFamily: 'Montserrat',
      fontWeight: "700",
    },
    buttonStyle: {
      width: '68%',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#3aafa9',
      padding: 10,
      borderRadius: 27,
      borderColor: '#3aafa9',
      borderWidth: 1,
      marginTop: 20,
      marginLeft: 5,
      marginRight: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.2,
    },
    modalContent: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      height: 350,
    },
    modalTabs: {
      backgroundColor: "white",
    },
    modalDescription: {
      paddingTop: 25,
      fontSize: 16,
      fontFamily: 'Montserrat',
    },
    exitText: {
      textAlign: 'center',
      alignSelf: 'center',
      color: 'white',
      paddingTop: 30,
      fontSize: 16,
      fontFamily: 'Montserrat',
      fontWeight: "600",
    },
    modalTitle: {
      fontSize: 18,
      fontFamily: 'Montserrat',
      fontWeight: '700',
      textAlign: 'center',
      paddingTop: 25,
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


export default Profile;
