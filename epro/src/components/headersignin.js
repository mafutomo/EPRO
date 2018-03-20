import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle } from 'native-base';

const HeaderSignIn = (props) => {

    return (
      <Container>
        <Header style = {styles.header}>
          <Left>
            <Button
            transparent
            onPress={props.onPress}>
              <Icon name='arrow-back'
              style ={styles.iconStyle} />
            </Button>
          </Left>
          <Body style = {styles.bodyStyle}>
            <Title style={styles.titleText}>E/PRO</Title>
            <Subtitle style={styles.subTitleText}>{props.headerText}</Subtitle>
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
      height: 200,
      backgroundColor: '#17252A'
    },
    titleText: {
      fontFamily: 'Montserrat',
      fontSize: 37,
      color: '#FEFFFF',
    },
    subTitleText:{
      color: '#FEFFFF',
      fontSize: 15,
      paddingTop: 14,
    },
    iconStyle:{
      color: '#FEFFFF',
      paddingBottom: 170
    }

  });

export default HeaderSignIn;
