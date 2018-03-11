import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';

const CoverHeader = (props) => {

    return (
      <Container>
        <Header style = {styles.header}>
          <Left>

          </Left>
          <Body style = {styles.bodyStyle}>
            <Title style={styles.titleText}>E/PRO</Title>
            <Subtitle style={styles.subTitleText}>Train | Track | Crush</Subtitle>
          </Body>
          <Right>
          </Right>
        </Header>

      </Container>
    );

}

const styles = StyleSheet.create({
    bodyStyle: {
      marginLeft: -150,
      marginRight: -150,
    },
    header: {
      height: 300,
      backgroundColor: '#17252A',
      paddingTop: 170,
    },
    titleText: {
      fontFamily: 'Montserrat',
      fontSize: 37,
      color: '#FEFFFF',
    },
    subTitleText:{
      color: '#FEFFFF',
      fontSize: 17,
      paddingTop: 14,
    },


  });

export default CoverHeader
