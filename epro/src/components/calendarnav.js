import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab, Content, Card, CardItem, Text, Body, Title, Right, Left, CheckBox, Button } from 'native-base';
import InputBox from './inputbox';
import SmallInputBox from './smallinputbox';
import ExerciseDetail from '../components/exercisedetail';
import Icon from 'react-native-ionicons';
import Spinner from './spinner';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Modal from "react-native-modal";

class CalendarNav extends Component {

  constructor(props) {
     super(props)

     this.state = {
       todayDate: new Date(),
       todayISODate:'',
       usersCurrentTab:'',
       dateTabs:[],
       selectedExercises:[],
       isEditModalVisible: false,
       inputExerciseName:'',
       inputDescription:"",
       inputRep:0,
       inputSet:0,
       inputWeight:0,
       inputTime:'00:00',
       userId: this.props.userId,
       isLoading:true,
       language: "js",
       }
  }
//'https://epro-fitness-api.herokuapp.com/users/2/workouts/03-05-18'
  async componentDidMount(){

    //create the array of dates
    this.getDateTabsArray()

    //create the value to fetch for exercises on current date
    let currentISODate = this.state.todayDate.toISOString().split('T')[0]
    this.setState({todayISODate:currentISODate})

    setTimeout(this._tabs.goToPage.bind(this._tabs,4))

  }

//to create an array of all the days of current month
  getDateTabsArray () {

    let currentDate = new Date()
    let date = new Date(2018, 2, currentDate.getDate()+1)
     let days = []

     for(let i = -4; i < 7; i++){
       let currentDate = new Date()
       let date = new Date(2018, 2, currentDate.getDate()+i)
       days.push(date)
     }

     this.setState({dateTabs:days})
     return days
   }

//to render tabs showing all dates in the dateTabs array as individual tabs
  renderTabs(){
    return this.state.dateTabs.map(tab => {
      let tabName = tab.toString().substr(0, 10)
      let usersCurrentTab = this.state.usersCurrentTab
      let splitDate = usersCurrentTab.split('-')
      let comparisonDate = `${splitDate[2]}-${splitDate[0].padStart(2,0)}-${splitDate[1]}`

      if(this.state.isLoading){
        return <Tab
                style = {styles.tabContainer}
                tabStyle={{backgroundColor: '#17252A'}}
                activeTabStyle={{backgroundColor: '#17252A'}}
                activeTextStyle={{color: '#DEF2F1'}}
                heading={`${tabName}`}
                >
                  <Spinner/>
                </Tab>
      }

      if(tab.toISOString().split('T')[0] === comparisonDate){

        return <Tab
                style = {styles.tabContainer}
                tabStyle={{backgroundColor: '#17252A'}}
                activeTabStyle={{backgroundColor: '#17252A'}}
                activeTextStyle={{color: '#DEF2F1'}}
                heading={`${tabName}`}
                >
                <TouchableOpacity
                style={styles.iconContainer}
                onPress={ () => {this.toggleEditModalVisible()}}>
                  <Icon
                    active name="add-circle"
                    size={45}
                    color={'#FFBA49'}
                  />
                </TouchableOpacity>

                  {this.renderExercises()}

                </Tab>

          } else {

            return <Tab
                    tabStyle={{backgroundColor: '#17252A'}}
                    activeTabStyle={{backgroundColor: '#17252A'}}
                    activeTextStyle={{color: '#DEF2F1'}}
                    heading={`${tabName}`}
                    style = {styles.tabEmpty}
                    >

                    <TouchableOpacity
                    style={styles.soleIconContainer}
                    onPress={this.toggleEditModalVisible}>
                      <Icon
                        active name="add-circle"
                        size={45}
                        color={'#FFBA49'}
                      />
                    </TouchableOpacity>

                    </Tab>
          }
        })
      }


//render the exercise cards based on the this.state.exercises
  renderExercises() {

    return this.state.selectedExercises.map( exercise => {

      return <ExerciseDetail
      key = {exercise.exercise_id}
      exerciseName= {exercise.name}
      data = {[[exercise.sets,exercise.reps,exercise.weight,exercise.time]]}
      onPress ={() => this.deleteExercise(exercise)}
      />
    })
  }

  deleteExercise(data){
    console.log("woo!");
    let workoutExerciseID = data.id
    let exerciseID = data.exercise_id
    fetch(`https://epro-fitness-api.herokuapp.com/exercises/${workoutExerciseID}/${exerciseID}/`, {
      method: 'DELETE'
    })
    .then(response => {
      return response.json()
    })
    .then( responseJson => {
      console.log(responseJson)
    })

    let currentTabDate = this.state.usersCurrentTab

    fetch(`https://epro-fitness-api.herokuapp.com/users/${this.state.userId}/workouts/${currentTabDate}`,{
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then( response => {
      return response.json()
    })
    .then(responseJson => {
        this.setState({ selectedExercises: responseJson[0].exercises })
    })

  }

//initiated by onChangeTab, this updates the state tracking date user is currently viewing
  setCurrentTabState(params) {
    //get the chosen date in ISO format based on the index of the tab user clicked on
    //'params' passes the tab index user clicked on
    let dayIndex = params.i
    let dateArray = this.state.dateTabs
    let dateValue = dateArray[dayIndex].toString()

    let dayDate = dateValue.substring(8,10)
    this.setState({isLoading:true})
    let newState = `${this.state.todayDate.getMonth()+1}-${dayDate}-${this.state.todayDate.getFullYear()}`


    this.setState({usersCurrentTab:newState})


      fetch(`https://epro-fitness-api.herokuapp.com/users/${this.state.userId}/workouts/${newState}`)
      .then(response => {
        return response.json()
      })
      .then(responseJson => {
        console.log("responseJson", responseJson);
          if(responseJson.length === 0) {
            this.setState({
              isLoading:false,
              todayDate:new Date(newState),
              selectedExercises:[],
            })
          } else {
            this.setState({
            isLoading:false,
            todayDate: new Date(newState),
            selectedExercises:responseJson[0].exercises})
          }
      })
  }

//for modal visibility
  toggleEditModalVisible = () => {
    this.setState({ isEditModalVisible: true })
  }

  hideMondalOmitState = () =>{
    this.setState({
      inputExerciseName:"",
      inputDescription:"",
      inputRep:0,
      inputWeight:0,
      inputSet:0,
      inputTime:'00:00',
      isEditModalVisible: false
    })

  }

//for creating a new exercise in the current tab
  addExercise = () => {

    let currentTabDate = this.state.usersCurrentTab
    fetch(`https://epro-fitness-api.herokuapp.com/users/${this.state.userId}/workouts/${currentTabDate}`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        name:this.state.inputExerciseName,
        description:this.state.inputDescription,
        sets:this.state.inputSet,
        reps:this.state.inputRep,
        weight:this.state.inputWeight,
        time:this.state.inputTime,
      })
    })
    .then( response => {
      return response.json()
    })
    .then(responseJson => {
      var newState = this.state.selectedExercises.slice()
      newState.push(responseJson[0])
      this.setState({ selectedExercises: newState })
    })
    this.setState({
      inputExerciseName:"",
      inputDescription:"",
      inputRep:0,
      inputWeight:0,
      inputSet:0,
      inputTime:'00:00',
      isEditModalVisible: false
    })
  }

//Main Render
  render() {

    return (
      <Container>
      <Content style={styles.contentBody}>
        <Header hasTabs
        style = {styles.body}
        />

        <Tabs
        tabBarUnderlineStyle = {{backgroundColor: '#CB2D6F'}}
        renderTabBar={()=> <ScrollableTab tabsContainerStyle={{color: '#DEF2F1'}}/>}
        ref={component => this._tabs = component}
        onChangeTab= {(i) => {this.setCurrentTabState(i)}}
        >
          {this.renderTabs()}

        </Tabs>

        //Add Exercise Modal
          <Modal
          isVisible={this.state.isEditModalVisible}
          >
            <View
            style={{ flex: 1 }}
            style={styles.modalContent}>
              <Text
              style={styles.modalTitle}>Create an Exercise</Text>

            <InputBox
            placeholder="Name"
            onChangeText={(text) => this.setState({inputExerciseName:text})}
            />
            <InputBox
            placeholder="Description"
            onChangeText={(text) => this.setState({inputDescription:text})}
            />

            <View style = {{flexDirection: 'row', paddingTop:20}}>

            <View style = {{flexDirection:'column',alignItems:'center',paddingRight:15}}>
            <Text>Sets</Text>
            <SmallInputBox
            placeholder="0"
            onChangeText={(text) => this.setState({inputSet:text})}/>
            </View>

            <View
            style={styles.boxSpacing}>
            </View>

            <View style = {{flexDirection:'column',alignItems:'center'}}>
            <Text>Weight</Text>
            <SmallInputBox
            placeholder="0 Ibs"
            onChangeText={(text) => this.setState({inputWeight:text})}/>
            </View>

            </View>

            <View style = {{flexDirection: 'row', paddingTop: 10}}>
            <View style = {{flexDirection:'column',alignItems:'center',paddingRight:15}}>
              <Text>Reps</Text>
              <SmallInputBox
              placeholder="0"
              onChangeText={(text) => this.setState({inputRep:text})}/>
            </View>
            <View
            style={styles.boxSpacing}
            >
            </View>
            <View style = {{flexDirection:'column',alignItems:'center'}}>
            <Text>Time</Text>
            <SmallInputBox
            placeholder="00:00"
            onChangeText={(text) => this.setState({inputTime:text})}/>
            </View>
            </View>

            <View style = {{flexDirection: 'row', paddingTop: 30, paddingBottom: 25}}>
              <TouchableOpacity
              style = {styles.cancelModalButton}
              onPress = { () => {this.hideMondalOmitState()}}
              >
                <Text
              style = {styles.cancelModalText}
                >Cancel</Text>
              </TouchableOpacity>

              <View
              style = {styles.buttonSpace}>
              </View>

              <TouchableOpacity
              style = {styles.submitModalButton}
              onPress = { () => {this.addExercise()}}
              >
                <Text
                style = {styles.submitModalText}
                >Save</Text>
              </TouchableOpacity>
            </View>
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems:'center',
  },
  body:{
    backgroundColor: '#17252A',
      height: 25,
  },
  iconContainer:{
    marginTop: 15,
    marginBottom: 10,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  soleIconContainer:{
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    height: 550,
  },
  contentBody: {
      backgroundColor: '#FEFFFF',
  },
  tabEmpty: {
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    fontSize: 18,
    fontFamily: 'DidactGothic-Regular',
    paddingRight: 15,
  },
  saveButton:{
    fontSize: 18,
    fontFamily: 'DidactGothic-Regular',
    paddingLeft: 15,
  },
  modalTitle:{
    fontSize: 20,
    paddingBottom: 30,
    fontFamily: 'Montserrat',
  },
  submitModalText: {
        alignSelf: 'center',
        color: '#FEFFFF',
        fontSize: 15,
        fontFamily: 'Montserrat',
      },
  submitModalButton: {
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B7A78',
    padding: 8,
    borderRadius: 27,
    borderColor: '#2B7A78',
    borderWidth: 1,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  cancelModalText: {
        alignSelf: 'center',
        color: '#FEFFFF',
        fontSize: 15,
        fontFamily: 'Montserrat',
      },
  cancelModalButton: {
    width: '30%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF5B5B',
    padding: 8,
    borderRadius: 27,
    borderColor: '#EF5B5B',
    borderWidth: 1,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
  },
  buttonSpace:{
    padding:18,
  },
  boxSpacing:{
    padding:10,
  }

});


export default CalendarNav;
