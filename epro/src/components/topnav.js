import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {NavigationActions} from 'react-navigation';

import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

export default class TopNav extends Component {

  render() {
    return (

        <Header style={[styles.header, styles.container]}>
          <Left>
            <Button
            transparent
             onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name='menu' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.topNavText}>E/PRO</Title>
          </Body>
          <Right>
            <Button transparent>
            </Button>
          </Right>
        </Header>

    );
  }
}

const styles = StyleSheet.create({
    container: {
      // marginBottom: 0,
      height: 75,
    },
    header: {
      backgroundColor: '#FEFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      height: 70,
      paddingTop: 15,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2},
      shadowOpacity: 0.2,
      position: 'relative',
    },
    topNavText: {
      color: '#17252A',
      // fontFamily: 'Montserrat',
      fontSize: 22,
      alignSelf: 'center',
    },
    icon: {
      color: '#17252A',
    }
  });
