import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Footer, FooterTab, Button, Icon, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import platform from '../../native-base-theme/variables/platform';
const routes = ["Home", "Workout","History","Profile"];

export default class BottomNav extends Component {

  render() {

    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Footer style={styles.container}>
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
          </Footer>
        </Container>
      </StyleProvider>
    )
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
