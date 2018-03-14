import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, Content, Card, CardItem, Text, Body, Title, Right, Left, CheckBox, Button } from 'native-base';
import Spinner from './spinner';
import InputBox from './inputbox';
import SmallInputBox from './smallinputbox';
import ExerciseDetail from '../components/exercisedetail';
import Icon from 'react-native-ionicons';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';



class CalendarNav extends Component {

  constructor(props) {
     super(props)
     this.state = {
       exercises:[],
       }
  }

  async componentWillMount(){
    const response = await fetch('https://epro-fitness-api.herokuapp.com/users/2/workouts/03-05-18', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const responseJson = await response.json()
    this.setState({exercises: responseJson[0].exercises})

  }

  renderExercises(){
    return this.state.exercises.map( exercise => {
      return <ExerciseDetail
      key = {exercise.exercise_id}
      exerciseName= {exercise.name}
      data = {[[exercise.sets,exercise.reps,exercise.weight,exercise.time]]}/>
    })
  }

  render() {
    console.log("state of exercises", this.state.exercises);
    return (
      <Container>
        <Header hasTabs
        style = {styles.body}
        />
        <Tabs
        tabBarUnderlineStyle = {{backgroundColor: '#CB2D6F'}}
        renderTabBar={()=> <ScrollableTab tabsContainerStyle={{color: '#DEF2F1'}}/>}
        >
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Mon 12"
          style = {styles.tabBody}>

          {this.renderExercises()}

          </Tab>
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Tues 13"
          style = {styles.tabBody}>
            <ExerciseDetail />
            <ExerciseDetail />
            <ExerciseDetail />
            <ExerciseDetail />
          </Tab>
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Wed 14">
            <SmallInputBox />
          </Tab>
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Thurs 15"
          >
            <InputBox />
          </Tab>
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Fri 16">
            <Spinner />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    backgroundColor: '#17252A',
    height: 20,
  },
  tabBody:  {
    flexWrap:'wrap',
  },
  card: {
    backgroundColor: '#FEFFFF',
    color: '#17252A',
    fontSize: 18,
    fontFamily: 'DidactGothic-Regular',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,

  },
  titleText: {
    fontSize: 18,
    padding: 0,
    margin: 0,
  },
  subText: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    // fontFamily: 'Montserrat',
  },
  table: {
    width: '75%',
    backgroundColor: '#FEFFFF',
    borderWidth: 0,
    padding: 0,
    margin: 5,
  },
  head: {
    height: 30,
    backgroundColor: '#DEF2F1',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  row: {
    height: 35,
    borderWidth: 0,
    padding: 0,
    margin: 0,

  },
  text: {
    textAlign: 'center',
    color: '#17252A'
  }
});


export default CalendarNav;
