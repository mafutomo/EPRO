import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';

class Workout extends Component {

  constructor(props) {
     super(props)
     this.state = {

       }
  }

  render() {
    return (
        <Container>
          <Head />
          <Banner/>
          <Content>

          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
    }

};


export default Workout;
