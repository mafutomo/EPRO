import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
export default class BottomNav extends Component {
  render() {
    return (
        <Container style={styles.container}>
          <Footer>
            <FooterTab>
              <Button active tyle={styles.container}>
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
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'green',
    },
    textContent: {
      fontSize: 20,
      color: 'red',
    },
  });
