import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, StatusBar, View } from "react-native";
import { Container, Content, Text, List, ListItem, Header, Icon } from "native-base";
import { DrawerNavigator} from 'react-navigation';
import SideBackground from '../components/sidebackground';
import Login from '../views/login';
import Home from '../views/home';
import TabNavigator from './tabrouter';

const routes = ["ABOUT E/PRO", "LOGOUT"];
const icons = ["information-circle", "exit"]

const DrawerRouter = DrawerNavigator(
  {
    Home : { screen : TabNavigator },
    Logout : { screen : Login},
  },
  {
    initialRouteName: 'Home',
    drawerWidth: 325,
    contentComponent: props => {
      return (
        <Container>
        <Header style = {styles.header}>
          </Header>
          <SideBackground />
          {/* <Content style={styles.body}> */}
            <List
            style={{marginTop: 0}}>
                  <ListItem
                    button
                    style={{borderBottomWidth: 0}}
                    onPress={() =>  props.navigation.navigate('Logout')}>
                    <Icon name='information-circle'
                    style ={styles.iconStyle} />
                    <Text
                    style={styles.textStyle}>About E/Pro</Text>
                  </ListItem>

                  <ListItem
                    button
                    style={{borderBottomWidth: 0}}
                    onPress={() => props.navigation.navigate("Logout")}>
                    <Icon name='exit'
                    style ={styles.iconStyle} />
                    <Text
                    style={styles.textStyle}>Log out</Text>
                  </ListItem>
            </List>
          {/* </Content> */}
        </Container>
      )
    }
  }
)

const styles = StyleSheet.create({

  textStyle: {
    fontFamily:'DidactGothic-Regular',
    color: 'black',
    fontSize:17,
  },
  header: {
    height: 20,
  },
  iconStyle:{
    marginRight: 20,
    color:'#FEFFFF',
  }
})

export default DrawerRouter;
