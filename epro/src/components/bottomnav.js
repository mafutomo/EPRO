import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
const routes = ["Home", "Workout","History","Profile"];

export default class BottomNav extends Component {

  render() {

    return (

        <Container>
          <Footer>
          <StyleProvider style ={getTheme(material)}>
            <FooterTab>
              <Button
              onPress={() => this.props.navigation.navigate("Home")}
              >
                <Icon name="home" style={styles.icons}/>
              </Button>
              <Button

              onPress={() => this.props.navigation.navigate("Workout")}
              >
                <Icon name="calendar" style={styles.icons}/>
              </Button>
              <Button>
                <Icon name="stats" style={styles.icons}/>
              </Button>
              <Button>
                <Icon name="person" style={styles.icons}/>
              </Button>
            </FooterTab>
            </StyleProvider>
          </Footer>
        </Container>

    )
  }
}

const styles = StyleSheet.create({

    icons: {
      color: '#FEFFFF',
    },
  });
