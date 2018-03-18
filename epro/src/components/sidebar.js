import React from "react";
import { AppRegistry, StyleSheet, Image, StatusBar, View } from "react-native";
import { Container, Content, Text, List, ListItem, Header, Icon } from "native-base";
const routes = ["ABOUT E/PRO", "LOGOUT"];
const icons = ["information-circle", "exit"]

const SideBar = (props) => {

    return (
      <Container>
      <Header style = {styles.header}>
        </Header>
        <Content style={styles.body}>
          <List>
                <ListItem
                  button
                  style={{borderBottomWidth: 0}}
                  onPress={() => this.props.navigation.navigate("About E/Pro")}>
                  <Icon name='arrow-back'
                  style ={styles.iconStyle} />
                  <Text
                  style={styles.textStyle}>About E/Pro</Text>
                </ListItem>

                <ListItem
                  button
                  style={{borderBottomWidth: 0}}
                  onPress={() => this.props.navigation.navigate("Logout")}>
                  <Icon name='arrow-back'
                  style ={styles.iconStyle} />
                  <Text
                  style={styles.textStyle}>Log out</Text>
                </ListItem>
          </List>
        </Content>
      </Container>
    );

}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FEFFFF',

  },
  textStyle: {
    fontFamily:'DidactGothic-Regular',
    color: '#17252A',
    fontSize:20,
  },
  header: {
    height: 130,
    backgroundColor: '#DEF2F1',
  },
  iconStyle:{

  }
})

export default SideBar;
