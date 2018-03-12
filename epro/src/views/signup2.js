import React, { Component } from 'react';
import { Text, View, StyleSheet, DatePickerIOS } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import HeaderSignIn from '../components/headersignin';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import LoginProgress from '../components/loginprogress';
// import Slider from '../components/slider';
import Slider from 'react-native-slider';

class SignUp2 extends Component {
  constructor(props) {
     super(props)
     this.state = {
       buttonName: "SIGN UP",
       chosenDate: new Date(),
       chosenCycleLength: 25,
       }
     this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
   this.setState({chosenDate: newDate})
  }

  setCycleLength(newDate) {
   this.setState({chosenDate: newDate})
  }

  render() {
    console.log("this.state.date = ",this.state.chosenDate);
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

          />

          <Submit
            buttonName = {this.state.buttonName}
            onPress={() => console.log("stuff for login!")}
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
  }
})


export default SignUp2;
