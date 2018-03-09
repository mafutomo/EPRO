import React from 'react';
import { AppRegistry, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Container, List, ListItem, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import { StackNavigator } from 'react-navigation';

import SideBar from './src/components/sidebar'
import Home from './src/views/home';
import History from './src/views/history';
import Hormones from './src/views/hormones';
import Login from './src/views/login';
import Workout from './src/views/workout';
import SignUp from './src/views/signup';

const App = () => {
  return (
  <Container>
    <Home />
  </Container>
)
}

export default StackNavigator({
  Home: {
    screen: Home,
  },
  Workout: {
    screen: Workout,
  },

});



AppRegistry.registerComponent('epro', () => App);
