import React, { Component } from 'react';
import { View, StyleSheet, DatePickerIOS } from 'react-native';
import { Container, Text, Header, Footer, Content, ListItem, Radio, Right } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import LoginProgress from '../components/loginprogress';
import SmallInputBox from '../components/smallinputbox';
import Slider from 'react-native-slider';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const radio_props = [
  {label: 'Non-Hormonal', value: "non_hormonal" },
  {label: 'Triphasic', value: "triphasic" },
  {label: 'Monophasic', value: "monophasic" },
  {label: 'Progestin', value: "progestin" }
];


class SignUp2 extends Component {
  constructor(props) {
     super(props)
     this.state = {
       buttonName: "SIGN UP",
       firstName: this.props.navigation.state.params.firstName,
       lastName: this.props.navigation.state.params.lastName,
       email: this.props.navigation.state.params.email,
       password: this.props.navigation.state.params.password,
       chosenDate: new Date(),
       chosenCycleLength: 25,
       chosenBCType:"",
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
    const response = await fetch('https://e-pro-api.herokuapp.com/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
       firstName: this.state.firstName,
       lastName: this.state.lastName,
       password: this.state.password,
       age: 25,
       weight: 150,
       cycleLength: this.state.chosenCycleLength,
       lastDay: this.state.chosenDate,
       email: this.state.email,
       isTrainer: false,
       isPublic: false,
       isNonHormonal: true,
       isTriphasic: false,
       isMonophasic: false,
       isProgestin: false
     }),
    })
    const responseJson = await response.json()
    console.log("CREATE USER RESPONSE = ",responseJson)
  }

  render() {
    console.log(this.state);
    return (
        <Container style={styles.background} >
          <HeaderSignIn
          onPress={() => this.props.navigation.goBack()}
          />
          <Content style = {styles.content}>
          <LoginProgress
          progress={0.90}/>

          <Text style={styles.headerText}>Date of Last Period</Text>
          <View style={styles.datePickerStyle}>
            <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={this.setDate}
            maximumDate={new Date()}
            mode="date"
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
            <SmallInputBox />
            <View style={styles.padding}/>
            <Text>Weight: </Text>
            <SmallInputBox />
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
  datePickerStyle:{
    width: 250,
    alignSelf: 'center',
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
