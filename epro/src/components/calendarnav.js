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
       dateTabs:[],
       currentDate: new Date()
       }
  }

  async componentWillMount(){
    console.log("get to days in month => ",this.getDaysInMonth())
    const response = await fetch('https://epro-fitness-api.herokuapp.com/users/2/workouts/03-05-18', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const responseJson = await response.json()
    console.log("RESPONSEJSON",responseJson);
    this.setState({exercises: responseJson[0].exercises})

    setTimeout(this._tabs.goToPage.bind(this._tabs,2))
  }

  getDaysInMonth () {
    let currentDate = new Date()
    let currentMonth = currentDate.getMonth()
    let currentYear = currentDate.getFullYear()

     let date = new Date(currentYear, currentMonth, 1)
     let days = []
     while (date.getMonth() === currentMonth) {
       let dateElement = new Date(date)
        days.push(dateElement.toISOString().slice(0,10))
        date.setDate(date.getDate() + 1)
     }
     this.setState({dateTabs:days})
     return days
   }

  renderTabs(){
    return this.state.dateTabs.map(tab => {
      let tabName = tab.substring(5,10)
      return <Tab
              tabStyle={{backgroundColor: '#17252A'}}
              activeTabStyle={{backgroundColor: '#17252A'}}
              activeTextStyle={{color: '#DEF2F1'}}
              heading={`${tabName}`}
              style = {styles.tabBody}>
              </Tab>
    })
  }

  renderExercises() {
    return this.state.exercises.map( exercise => {
      return <ExerciseDetail
      key = {exercise.exercise_id}
      exerciseName= {exercise.name}
      data = {[[exercise.sets,exercise.reps,exercise.weight,exercise.time]]}/>
    })

  }

  render() {
    console.log("state of exercises", this.state.exercises);
    console.log("this.state.dateTabs", this.state.dateTabs);
    console.log("this.state.currentDate", this.state.currentDate.toISOString().split('T'));
    return (
      <Container>
        <Header hasTabs
        style = {styles.body}
        />
        <Tabs
        tabBarUnderlineStyle = {{backgroundColor: '#CB2D6F'}}
        renderTabBar={()=> <ScrollableTab tabsContainerStyle={{color: '#DEF2F1'}}/>}
        ref={component => this._tabs = component}
        >
          {this.renderTabs()}
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
