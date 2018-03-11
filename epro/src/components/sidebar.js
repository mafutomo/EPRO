import React from "react";
import { AppRegistry, StyleSheet, Image, StatusBar, View } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["ABOUT E/PRO", "LOGOUT"];

export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content style={styles.body}>

          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text
                  style={styles.textStyle}>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#3AAFA9',

  },
  textStyle: {
    fontFamily:'DidactGothic-Regular',
    color: '#FEFFFF',
    fontSize:15,
  }
})
