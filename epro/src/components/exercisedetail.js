import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Title, Icon, Right, Left } from 'native-base';
export default class ExerciseDetail extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card style={styles.card}>
            <CardItem header>
              <Title>One Arm Pull Ups</Title>
            </CardItem>
            <CardItem>
              <Left>
              </Left>
              <Text>Sets</Text>
              <Text>Reps</Text>
              <Text>Weight</Text>
              <Text>Time</Text>

            </CardItem>
            <CardItem>
              <Icon active name="create" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
            <CardItem footer>
              <Text>GeekyAnts</Text>
            </CardItem>
         </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FEFFFF',
    color: '#17252A',
    fontSize: 18,
    // fontFamily: 'DidactGothic-Regular',
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    position: 'relative',
  },
  subText: {
    fontSize: 16,
    // fontFamily: 'Montserrat',
  },
});
