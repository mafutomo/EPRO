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
       todayDate: new Date(),
       todayISODate:'',
       usersCurrentTab:'',
       dateTabs:[],
       exercises:[],
       }
  }
//'https://epro-fitness-api.herokuapp.com/users/2/workouts/03-05-18'
  async componentWillMount(){

    //create the array of dates
    this.getDateTabsArray()

    //create the value to fetch for exercises on current date
    let currentISODate = this.state.todayDate.toISOString().split('T')[0]
    this.setState({todayISODate:currentISODate})

    const response = await fetch(`http://localhost:3001/users/1/workouts/${currentISODate}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    const responseJson = await response.json()

    //set execises state with today's workouts
    this.setState({exercises: responseJson[0].exercises})

    //have tab automatically navigate to the current date
    let currentDayIndex = parseInt(this.state.todayDate.toISOString().slice(8,10))-1
    setTimeout(this._tabs.goToPage.bind(this._tabs,currentDayIndex))
  }

//to create an array of all the days of current month
  getDateTabsArray () {
    let currentMonth = this.state.todayDate.getMonth()
    let currentYear = this.state.todayDate.getFullYear()

     let date = new Date(currentYear, currentMonth, 1)
     let days = []
     while (date.getMonth() === currentMonth) {
       let dateElement = new Date(date)
        days.push(dateElement)
        date.setDate(date.getDate() + 1)
     }
     this.setState({dateTabs:days})
     return days
   }

//to render tabs showing all dates in the dateTabs array as individual tabs
  renderTabs(){
    return this.state.dateTabs.map(tab => {

      let stringTab = tab.toString()
      let tabName = stringTab.substr(0, 10)

      if(tab.toISOString().split('T')[0] == this.state.todayISODate){
        
        //if it is the current date, then render the exercises in this tab
        return <Tab
                tabStyle={{backgroundColor: '#17252A'}}
                activeTabStyle={{backgroundColor: '#17252A'}}
                activeTextStyle={{color: '#DEF2F1'}}
                heading={`${tabName}`}
                style = {styles.tabBody}>

                {this.renderExercises()}

                </Tab>
      } else {

        //if not, do not render any exercises in this tab
        return <Tab
                tabStyle={{backgroundColor: '#17252A'}}
                activeTabStyle={{backgroundColor: '#17252A'}}
                activeTextStyle={{color: '#DEF2F1'}}
                heading={`${tabName}`}
                style = {styles.tabBody}>

                </Tab>
      }
    })
  }

//render the exercise cards based on the this.state.exercises
  renderExercises() {
    return this.state.exercises.map( exercise => {
      return <ExerciseDetail
      key = {exercise.exercise_id}
      exerciseName= {exercise.name}
      data = {[[exercise.sets,exercise.reps,exercise.weight,exercise.time]]}/>
    })
  }

//initiated by onChangeTab, this updates the state tracking date user is currently viewing
  setCurrentTabState(i) {
    console.log(i);
    let newState = `${this.state.todayDate.getMonth()+1}-${i.i+1}-${this.state.todayDate.getFullYear()}`
    console.log("newState == ",newState);
    this.setState({usersCurrentTab:newState})
    if(newState) {
      fetch(`http://localhost:3001/users/1/workouts/${this.state.usersCurrentTab}`)
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        console.log("response == ", responseJson);
      })
    }
  }

  render() {
    return (
      <Container>
        <Header hasTabs
        style = {styles.body}
        />
        <Tabs
        tabBarUnderlineStyle = {{backgroundColor: '#CB2D6F'}}
        renderTabBar={()=> <ScrollableTab tabsContainerStyle={{color: '#DEF2F1'}}/>}
        ref={component => this._tabs = component}
        onChangeTab={(i) => {this.setCurrentTabState(i)}}
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
