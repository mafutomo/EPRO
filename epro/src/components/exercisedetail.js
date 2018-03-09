import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Body, Title, Icon, Right, Left, CheckBox, Button } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
export default class ExerciseDetail extends Component {
  render() {

    const tableHead = ['Sets', 'Reps', 'Weight', 'Time'];
    const tableData = [
      ['', '', '', '']
    ];

    return (
      <Container>
        <Content>
          <Card style={styles.card}>
             
            <CardItem>
              <Text style={styles.subText}>Description</Text>
            </CardItem>
            <CardItem>
              <Left></Left>
              <Table style={styles.table}>
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
              </Table>
              <Right></Right>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name="create" />
              </Left>
              <Table style={styles.table} >
                <Left></Left>
                <Row data={tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
                <Right></Right>
                <TableWrapper style={{flexDirection: 'row'}}>
                  <Rows data={tableData} flexArr={[1, 1, 1, 1]} style={styles.row}/>
                </TableWrapper>
              </Table>
              <Right>
                <CheckBox checked={true} style={{alignSelf: 'center'}}/>
              </Right>
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
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    position: 'relative',
  },
  titleText: {
    fontSize: 18,
    padding: 0,
    margin: 0,

  },
  subText: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    // fontFamily: 'Montserrat',
  },
  table: {
    width: '75%',
    backgroundColor: '#FEFFFF',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  head: {
    height: 30,
    backgroundColor: '#DEF2F1',
    borderWidth: 0,
    padding: 0,
    margin: 0,
  },
  row: {
    height: 35,
    borderWidth: 0,
    padding: 0,
    margin: 0,

  },
  text: {
    textAlign: 'center',
    color: '#17252A'
  }
});
