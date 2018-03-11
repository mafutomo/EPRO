import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { DrawerNavigator} from 'react-navigation';
import Home from '../views/home';
import Workout from '../views/workout';
import History from '../views/history';
import Hormones from '../views/hormones';
import DrawerRouter from './drawerrouter';

import { TabNavigator } from "react-navigation";
import {
  Button,
  Text,
  Icon,
  Item,
  Footer,
  FooterTab,
  Label
} from "native-base";

const TabRouter = TabNavigator(
  {
    Home: { screen: props => <Home {...props} /> },
    Workout: { screen: props => <Workout {...props} /> },
    History: { screen: props => <History {...props} /> },
    Hormones: { screen: props => <Hormones {...props} /> }
  },
  {
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
      return (

          <Footer style={styles.container}
          tabActiveBgColor = '#e91e63'>
            <FooterTab>
              <Button
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Home")}
              >
                <Icon name="home" style={styles.icons}/>
              </Button>

              <Button
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("Workout")}
              >
                <Icon name="calendar" style={styles.icons}/>
              </Button>

              <Button
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("History")}
              >
                <Icon name="stats" style={styles.icons}/>
              </Button>

              <Button
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("Hormones")}
              >
                <Icon name="person" style={styles.icons}/>
              </Button>
            </FooterTab>
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
