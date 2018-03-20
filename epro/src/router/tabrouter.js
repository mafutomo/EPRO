import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DrawerNavigator} from 'react-navigation';
import Home from '../views/home';
import Workout from '../views/workout';
import History from '../views/history';
import Profile from '../views/profile';
import DrawerRouter from './drawerrouter';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label,
  StyleProvider,
} from "native-base";


const TabRouter = TabNavigator(
  {
    Home: { screen: props => <Home {...props}/> },
    Workout: { screen: props => <Workout {...props} /> },
    History: { screen: props => <History {...props} /> },
    Profile: { screen: props => <Profile {...props} />}
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (

          <Footer
          style = {styles.container}
          >
              <StyleProvider style ={getTheme(material)}>
            <FooterTab>
              <Button
              style = {styles.container}
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Home",{screenNum:1})}
              >
                <Icon name="home" style={styles.icons}/>
              </Button>

              <Button
              style = {styles.container}
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Workout",{screenNum:2})}
              >
                <Icon name="calendar" style={styles.icons}/>
              </Button>

              <Button
              style = {styles.container}
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("History")}
              >
                <Icon name="stats" style={styles.icons}/>
              </Button>

              <Button
              style = {styles.container}
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("Profile")}
              >
                <Icon name="person" style={styles.icons}/>
              </Button>
            </FooterTab>
            </StyleProvider>
          </Footer>

        )
    }
  }
)

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#17252A',
    },
    icons: {
      color: '#FEFFFF',
    },
  });

export default TabRouter;
