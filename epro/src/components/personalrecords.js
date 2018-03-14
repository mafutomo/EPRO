import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Grid, Col} from 'native-base';

class PersonalRecords extends Component {

  constructor(props) {
     super(props)
     this.state = {}
  }

  render() {
    return (
        <Container >
          <Header backgroundColor={'#FEFFFF'}>
            <Grid>
              <Col style={{ backgroundColor: '#FEFFFF', height: '100%' }}>
                <Text style={styles.text}>My Workouts</Text>
                <Text style={styles.text}>24</Text>
              </Col>
              <Col style={{ backgroundColor: '#cccccc', height: '100%' }}>
                <Text style={styles.text}>Personal Records</Text>
                <Text style={styles.text}>24</Text>
              </Col>
              <Col style={{ backgroundColor: '#FEFFFF', height: '100%' }}>
                <Text style={styles.text}>Measurements</Text>
                <Text style={styles.text}>24</Text>
              </Col>
            </Grid>
        </Header>
        </Container>
      )
    }
  };

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'DidactGothic-Regular',
  },

})

export default PersonalRecords;