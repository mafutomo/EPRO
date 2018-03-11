import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationActions  } from 'react-navigation';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

const TopNav = (props) => {

    return (
        <Header style={styles.header}>
          <Left>
            <Button
            transparent
             onPress={() => navigate("DrawerOpen")}>
              <Icon name='menu' style={styles.headerIcon}/>
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


const styles = StyleSheet.create({
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
      height: 75,
    },
    topNavText: {
      color: '#17252A',
      fontFamily: 'Montserrat',
      fontSize: 22,
      alignSelf: 'center',
    },
    headerIcon: {
      color: '#17252A',
    }
  });


export default TopNav;
