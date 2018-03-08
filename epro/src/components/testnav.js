import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
const BottomNav = () => {

  const { bottomNavStyle } = styles;

    return (
        <Container style={styles.bottomNavStyle}>
          <Footer>
            <FooterTab>
              <Button active>
                <Icon active name="home" />
              </Button>
              <Button>
                <Icon name="calendar" />
              </Button>
              <Button>
                <Icon name="stats" />
              </Button>
              <Button>
                <Icon name="person" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
}

const styles = {
  bottomNavStyle: {
      backgroundColor: '#DEF2F1',
  },
  bottomNavText:{
    fontSize: 20,
    // fontFamily: 'DidactGothic-Regular',
  }
}

export default TestNav;
