import React from 'react';
import { AppRegistry, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Container, List, ListItem, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';

import SideBar from './src/components/sidebar'
import HomeScreen from './src/views/home';
import History from './src/views/history';
import Hormones from './src/views/hormones';
import Login from './src/views/login';
import Workout from './src/views/workout';
import SignUp from './src/views/signup';
import ExampleDrawer from './src/router/router';

const App = () => {
  return (
  <Container>
    <ExampleDrawer />
  </Container>
)
}



AppRegistry.registerComponent('epro', () => App);
