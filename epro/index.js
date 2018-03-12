import React from 'react';
import { AppRegistry, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Container, List, ListItem, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import SideBar from './src/components/sidebar'
import Home from './src/views/home';
import History from './src/views/history';
import Profile from './src/views/profile';
import Login from './src/views/login';
import Workout from './src/views/workout';
import SignUp from './src/views/signup';
import SignUp2 from './src/views/signup2';
import DrawerRouter from './src/router/drawerrouter';
import TabRouter from './src/router/tabrouter';
import SignUpRouter from './src/router/signuprouter';


const App = () => {
    return (
      <Container>
        <SignUpRouter/>

      </Container>
    )
}


AppRegistry.registerComponent('epro', () => App);
