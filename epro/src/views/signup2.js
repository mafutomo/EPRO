import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Text, Header, Footer, Content, ListItem, Radio, Right } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import LoginProgress from '../components/loginprogress';
import SmallInputBox from '../components/smallinputbox';
import Slider from 'react-native-slider';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DateTimePicker from 'react-native-modal-datetime-picker';

const radio_props = [
  {label: 'Non-Hormonal', value: "non_hormonal" },
  {label: 'Triphasic', value: "triphasic" },
  {label: 'Monophasic', value: "monophasic" },
  {label: 'Progestin', value: "progestin" }
];

class SignUp2 extends Component {
  constructor(props) {
     super(props)

     const propsNav = this.props.navigation.state.params

     this.state = {
       isDateTimePickerVisible: false,
       datePickerName: "Choose Date",
       buttonName: "SIGN UP",
       firstName: propsNav.firstName,
       lastName: propsNav.lastName,
       email: propsNav.email,
       password: propsNav.password,
       chosenDate: new Date(),
       chosenCycleLength: 25,
       chosenBCType:"",
       age: 0,
       weight: 0,
       }
     this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
   this.setState({chosenDate: newDate})
  }

  setCycleLength(newDate) {
   this.setState({chosenDate: newDate})
  }

  signUpUser = async () => {
    const response = await fetch('http://localhost:3001/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
       firstName: this.state.firstName,
       lastName: this.state.lastName,
       password: this.state.password,
       age: this.state.age,
       weight: this.state.weight,
       cycleLength: this.state.chosenCycleLength,
       lastDay: this.state.chosenDate,
       email: this.state.email,
       isTrainer: false,
       isPublic: false,
       birthControlType:this.state.chosenBCType,
     }),
    })
    const responseJson = await response.json()
    console.log("CREATE USER RESPONSE = ",responseJson)
  }

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    this.setState({chosenDate:date})
    this.hideDateTimePicker();
  };

  render() {
    console.log(this.state);
    return (
        <Container style={styles.background}>
          <HeaderSignIn
          onPress={() => this.props.navigation.goBack()}
          />
          <Content style = {styles.content}>

          <LoginProgress
          progress={0.90}/>

          <Text style={styles.headerText}>Date of Last Period</Text>
          <View style={styles.datePicker}>
            <Submit
              buttonName = {this.state.datePickerName}
              onPress={this.showDateTimePicker}
              />
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              maximumDate={new Date()}
            />
          </View>

          <Text style={styles.headerText}>Average Cycle Length</Text>
          <View style = {styles.slider}>
            <Slider
              step={1}
              minimumValue={21}
              maximumValue={36}
              value={this.state.chosenCycleLength}
              onValueChange={(val) => this.setState({chosenCycleLength:val})}
              trackStyle={styles.track}
              thumbStyle={styles.thumb}
              minimumTrackTintColor='#3AAFA9'
              maximumTrackTintColor='#b7b7b7'
              />
               <Text style={styles.sliderText}>
                 {this.state.chosenCycleLength} Days
               </Text>
          </View>

          <View style={styles.radioForm}>
          <RadioForm
          radio_props={radio_props}
          initial={"non_hormonal"}
          buttonColor={'#3AAFA9'}
          buttonInnerColor={'#FFBA49'}
          onPress={(value) => {this.setState({chosenBCType:value})}}
          />
          </View>

          <View style = {styles.ageAndWeight}>
            <Text>Age: </Text>
            <SmallInputBox
             onChangeText={(val) => {this.setState({age:val})}}/>
            <View style={styles.padding}/>
            <Text>Weight: </Text>
            <SmallInputBox
            onChangeText={(val) => {this.setState({weight:val})}} />
          </View>

          <Submit
            buttonName = {this.state.buttonName}
            onPress={this.signUpUser}
            />
          </Content>

        </Container>
      )
  }
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#f9f9f9',
  },
  content: {
    marginTop: -225,
  },
  headerText:{
    fontFamily: 'DidactGothic-Regular',
    alignSelf: 'center',
    fontSize: 20,
  },
  datePicker:{
    paddingBottom: 20,
  },
  datePickerButton: {
    marginLeft: -20,
    marginRight: -20,
  },
  slider:{
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 20,
    paddingTop: 15,
    width: 250,
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  track: {
    height: 2,
    borderRadius: 1,
    backgroundColor: '#c4c4c4',
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 30 / 2,
    backgroundColor: '#CB2D6F',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  sliderText: {
    alignSelf: 'center',
    fontFamily: 'DidactGothic-Regular',
    fontSize: 17,
  },
  ageAndWeight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  padding: {
    paddingRight: 25,
  }
})


export default SignUp2;
