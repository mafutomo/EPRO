import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import Spinner from './spinner';
import InputBox from './inputbox';
import SmallInputBox from './smallinputbox';

class CalendarNav extends Component {

  constructor(props) {
     super(props)
     this.state = {

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
        >
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Mon 12">
            <Spinner />
          </Tab>
          <Tab
          tabStyle={{backgroundColor: '#17252A'}}
          activeTabStyle={{backgroundColor: '#17252A'}}
          activeTextStyle={{color: '#DEF2F1'}}
          heading="Tues 13">
            <InputBox />
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
          heading="Thurs 15">
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

  }
});


export default CalendarNav;
