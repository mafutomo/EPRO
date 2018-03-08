import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
export default class BottomNav extends Component {
  render() {
    return (
        <Container>
          <Footer style={styles.container}>
            <FooterTab>
              <Button>
                <Icon name="home" style={styles.icons}/>
              </Button>
              <Button>
                <Icon name="calendar" style={styles.icons}/>
              </Button>
              <Button>
                <Icon name="stats" style={styles.icons}/>
              </Button>
              <Button>
                <Icon name="person" style={styles.icons}/>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#17252A',
    },
    icons: {
      color: '#FEFFFF',
    },
  });
